import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'components/app/App';
import IndexLoadable from 'components/index/IndexLoadable';
import NotFound from 'components/notfound/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexLoadable} />
        <Redirect from="foo" to="/" />
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
