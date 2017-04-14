import React from 'react';
import { compose } from 'redux';
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

function uniq(arr) {
    return [...new Set(arr)];
}

function isTruthy(val) {
    return !!val;
}

const flattenUniq = compose(uniq, flatten);

function fetchComponentData(renderProps, store) {
    const requests = renderProps.components
        .filter(isTruthy)
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

function getJsByChunkName(name, { clientAssetsByChunkName }) {
    let assets = clientAssetsByChunkName[name];
    if (!Array.isArray(assets)) {
        assets = [assets];
    }
    return assets.find(asset => /\.js$/.test(asset));
};

function getCssByChunkName(name, { clientAssetsByChunkName }) {
    let assets = clientAssetsByChunkName[name];
    if (!Array.isArray(assets)) {
        assets = [assets];
    }
    return assets.find(asset => /\.css$/.test(asset));
}

function getCodeSplitChunks({
    serverModulesById,
    clientModulesByIdentifier,
    clientChunksById
}, moduleIds) {
    const chunkIds = flatten(moduleIds.map(id => {
        const identifier = serverModulesById[id].identifier;
        const clientModule = clientModulesByIdentifier[identifier];
        if (!clientModule) {
            throw new Error(`${identifier} not found in client stats`);
        }
        return clientModule.chunks;
    }));
    // TODO: Test uniq is necessary here...
    return flattenUniq(
        chunkIds.map(id => {
            // TODO: Check why filtering (source maps and css?)
            // console.log(clientChunksById[id].files);
            return clientChunksById[id].files.filter(file => /\.js$/.test(file));
        })
    );
}

function getJs(stats, moduleIds) {
    return [
        getJsByChunkName('bootstrap', stats),
        ...getCodeSplitChunks(stats, moduleIds),
        getJsByChunkName('client', stats),
    ].filter(isTruthy);
}

function getCss(stats) {
    return [
        getCssByChunkName('client', stats)
    ].filter(isTruthy);
}

function render(renderProps, store, stats) {
    // const markup = renderToString(
    //     <Provider store={store}>
    //         <RouterContext {...renderProps} />
    //     </Provider>
    // );
    const markup = '';
    const head = Helmet.rewind();
    const moduleIds = Loadable.flushModuleIds();
    const js = getJs(stats, moduleIds);
    const css = getCss(stats);
    const initialState = store.getState();

    return renderToStaticMarkup(
        <Html
            js={js}
            css={css}
            html={markup}
            head={head}
            initialState={initialState}
        />
    );
}

/**
 * Express middleware to render HTML using react-router
 * @param  {object}     stats Webpack stats output
 * @return {function}   middleware function
 */
export default (clientStats, serverStats) => {
    // Build stats maps for quicker lookups.
    const serverModulesById = serverStats.modules.reduce((modules, mod) => {
        modules[mod.id] = mod;
        return modules;
    }, {});
    const clientModulesByIdentifier = clientStats.modules.reduce((modules, mod) => {
        modules[mod.identifier] = mod;
        return modules;
    }, {});
    const clientChunksById = clientStats.chunks.reduce((chunks, chunk) => {
        chunks[chunk.id] = chunk;
        return chunks;
    }, {});
    const clientAssetsByChunkName = clientStats.assetsByChunkName;

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
                            html = render(renderProps, store, {
                                serverModulesById,
                                clientModulesByIdentifier,
                                clientChunksById,
                                clientAssetsByChunkName
                            });
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
