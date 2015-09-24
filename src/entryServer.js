import React from 'react';
import Router from 'react-router';
import routes from './routes';
import Html from './html';

/**
 * Express middleware to render HTML using react-router
 * @param  {object}     req Express request object
 * @param  {object}     res Express response object
 * @param  {function}   next Express next callback
 * @param  {object}     stats Webpack stats output
 * @return {undefined}  undefined
 */
export default (req, res, next, stats) => {
    let js = '/' + stats.assetsByChunkName.main[0];
    let css = '/' + stats.assetsByChunkName.main[1];

    Router.run(routes, req.url, (Handler, state) => {
        let isNotFound = state.routes.some((route) => {
            return route.isNotFound;
        });
        let markup = React.renderToString(<Handler />);
        let html = React.renderToStaticMarkup(
            <Html js={js} css={css} markup={markup} />
        );

        res.status(isNotFound ? 404 : 200)
           .send('<!doctype html>' + html);
    });
};
