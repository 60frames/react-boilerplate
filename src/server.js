import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import configureStore from 'store/configureStore';
import routes, { NotFoundComponent } from 'routes';
import Html from 'components/html/Html';
import Loadable from 'components/lib/loadable/loadable';

function flatten(arr) {
    return [].concat.apply([], arr);
}

function fetchComponentData(renderProps, store) {
    const requests = renderProps.components
        // filter undefined values
        .filter(component => component)
        .map(component => {
            // Handle `connect`ed components.
            if (component.WrappedComponent) {
                component = component.WrappedComponent;
            }
            if (component.fetchData) {
                const { query, params, history } = renderProps;
                return component.fetchData({
                    dispatch: store.dispatch,
                    query,
                    params,
                    history
                })
                // Make sure promise always successfully resolves
                .catch(() => {});
            }
        });

    return Promise.all(requests);
}

function isNotFound(renderProps) {
    return !renderProps || renderProps.components
        .some(component => component === NotFoundComponent);
}

function getJsFromStats(stats) {
    let assets = stats.assetsByChunkName.client;
    if (!Array.isArray(assets)) {
        assets = [assets];
    }
    return assets.find(asset => /\.js$/.test(asset));
}

function getCssFromStats(stats) {
    let assets = stats.assetsByChunkName.client;
    if (!Array.isArray(assets)) {
        assets = [assets];
    }
    return assets.find(asset => /\.css$/.test(asset));
}

function getChunksFromStats(clientStats, serverStats, moduleIds) {
    // This is prob slow, should prob be built at start up.
    console.time('getChunksFromStats');
    const serverModulesById = serverStats.modules.reduce((modules, mod) => {
        modules[mod.id] = mod;
        return modules;
    }, {});
    const clientModulesByIdentifier = clientStats.modules.reduce((modules, mod) => {
        modules[mod.identifier] = mod;
        return modules;
    }, {});
    const chunkIds = flatten(moduleIds.map(id => {
        const identifier = serverModulesById[id].identifier;
        const clientModule = clientModulesByIdentifier[identifier];
        return clientModule.chunks;
    }));
    const clientChunksById = clientStats.chunks.reduce((chunks, chunk) => {
        chunks[chunk.id] = chunk;
        return chunks;
    }, {});
    // Dedupe.
    const r = flatten(chunkIds.map(id => {
        // Looks like hot updates are being pulled in here too, e.g. 0.231jjh23hdsa12e32.hot-update.js
        return clientChunksById[id].files.filter(file => /\.js$/.test(file));
    }));
    console.timeEnd('getChunksFromStats');
    return r;
}

function render(clientStats, serverStats, renderProps, store) {
    const markup = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    const head = Helmet.rewind();
    const moduleIds = Loadable.flushModuleIds();
    console.log(moduleIds);

    const js = getJsFromStats(clientStats);
    const css = getCssFromStats(clientStats);

    // Should prob be called from within `getJsFromStats`.
    const chunkJs = getChunksFromStats(clientStats, serverStats, moduleIds);

    const html = renderToStaticMarkup(
        <Html
            mainJs={js}
            chunkJs={chunkJs}
            css={css && `/${css}`}
            html={markup}
            head={head}
            initialState={store.getState()} />
    );

    return html;
}

/**
 * Express middleware to render HTML using react-router
 * @param  {object}     stats Webpack stats output
 * @return {function}   middleware function
 */
export default (clientStats, serverStats) => {

    /**
     * @param  {object}     req Express request object
     * @param  {object}     res Express response object
     * @return {undefined}  undefined
     */
    return (req, res, next) => {
        const url = req.url;
        const memoryHistory = createMemoryHistory(url);
        const store = configureStore();
        const history = syncHistoryWithStore(memoryHistory, store);

        match({
            history,
            routes,
            location: url
        }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
            } else {
                fetchComponentData(renderProps, store)
                    .then(() => {
                        let html;
                        try {
                            html = render(clientStats, serverStats, renderProps, store);
                        } catch (ex) {
                            return next(ex);
                        }
                        res.status(isNotFound(renderProps) ? 404 : 200)
                            .send(`<!doctype html>${html}`);
                    });
            }
        });
    };
};
