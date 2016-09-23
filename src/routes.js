import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'components/app/App';
import Index from 'components/index/Index';
import NotFound from 'components/notfound/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Redirect from="foo" to="/" />
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
