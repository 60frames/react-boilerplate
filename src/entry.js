import React from 'react';
import routes from './routes';
import Router from 'react-router';

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
