import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import Html from './components/html';

let match;
let RouterContext;
let Provider;
let configureStore;
let routes;
let NotFoundComponent;

if (!process.env.DISABLE_UNIVERSAL_RENDERING) {
    match = require('react-router').match;
    RouterContext = require('react-router').RouterContext;
    Provider = require('react-redux').Provider;
    configureStore = require('./store/configureStore').default;
    routes = require('./routes').default;
    NotFoundComponent = require('./routes').NotFoundComponent;
}

const DOCTYPE = '<!doctype html>';

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

function renderApp(renderProps, store) {
    const html = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
    );

    const state = store.getState();

    return [html, state];
}

function render(stats, html = '', state) {
    const js = getJsFromStats(stats);
    const css = getCssFromStats(stats);
    const head = Helmet.rewind();

    return renderToStaticMarkup(
        <Html
            js={js && `/${js}`}
            css={css && `/${css}`}
            html={html}
            head={head}
            initialState={state} />
    );
}

/**
 * Express middleware to render HTML using react-router
 * @param  {object}     stats Webpack stats output
 * @return {function}   middleware function
 */
export default (stats) => {

    /**
     * @param  {object}     req Express request object
     * @param  {object}     res Express response object
     * @return {undefined}  undefined
     */
    return (req, res, next) => {
        if (process.env.DISABLE_UNIVERSAL_RENDERING) {
            let html;
            try {
                html = render(stats);
            } catch (ex) {
                return next(ex);
            }
            return res.status(200)
                .send(`${DOCTYPE}${html}`);
        }

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
                            const [markup, state] = renderApp(renderProps, store);
                            html = render(stats, markup, state);
                        } catch (ex) {
                            return next(ex);
                        }
                        res.status(isNotFound(renderProps) ? 404 : 200)
                            .send(`${DOCTYPE}${html}`);
                    });
            }
        });
    };
};
