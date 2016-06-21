import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import configureStore from './store/configureStore';
import routes, { NotFoundComponent } from './routes';
import Html from './components/html';

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
    return stats.assetsByChunkName.client.find(asset => /\.js$/.test(asset));
}

function getCssFromStats(stats) {
    return stats.assetsByChunkName.client.find(asset => /\.css$/.test(asset));
}

function render(stats, renderProps, store) {
    const js = getJsFromStats(stats);
    const css = getCssFromStats(stats);

    const markup = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    const head = Helmet.rewind();

    const html = renderToStaticMarkup(
        <Html
            js={js && `/${js}`}
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
export default stats => {

    /**
     * @param  {object}     req Express request object
     * @param  {object}     res Express response object
     * @return {undefined}  undefined
     */
    return (req, res, next) => {
        match({
            routes,
            location: req.url
        }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
            } else {
                const store = configureStore();
                fetchComponentData(renderProps, store)
                    .then(() => {
                        let html;
                        try {
                            html = render(stats, renderProps, store);
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
