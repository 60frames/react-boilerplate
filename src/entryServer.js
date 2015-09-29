import React from 'react';
import Router from 'react-router';
import Helmet from 'react-helmet';
import routes from './routes';
import Html from './html';

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
    return (req, res) => {
        let js = '/' + stats.assetsByChunkName.main[0];
        let css = '/' + stats.assetsByChunkName.main[1];

        Router.run(routes, req.url, (Handler, state) => {
            let isNotFound = state.routes.some((route) => {
                return route.isNotFound;
            });
            let markup = React.renderToString(<Handler />);
            // TODO: Only using the Helmet title functionality for now
            // as we have to dangerouslySetInnerHTML to use the
            // meta and this adds <div>'s in the <head>.
            // Must Helmet.rewind after renderToString.
            let head = Helmet.rewind();
            let html = React.renderToStaticMarkup(
                <Html js={js} css={css} html={markup} head={head} />
            );

            res.status(isNotFound ? 404 : 200)
               .send('<!doctype html>' + html.replace(/<(\/)?div>/i, ''));
        });
    };
};
