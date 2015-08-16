import 'css-reset';
import logger from 'andlog';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

logger.info('App started...');

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
