import 'css-reset';
import logger from 'andlog';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
/* eslint-disable no-unused-vars */
// Always build in Modernizr, as it is probabaly used in CSS.
import Modernizr from 'modernizr';
/* eslint-enable no-unused-vars */

logger.info('App started...');

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
