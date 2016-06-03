import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import Index from './components/Index';
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Redirect from="foo" to="/" />
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
