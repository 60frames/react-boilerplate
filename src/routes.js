/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import Layout from './components/layout/layout';
import Index from './components/index/index';
import four04 from './components/four04/four04';

var routes = (
    <Route name="layout" handler={Layout} path="/">
        <DefaultRoute name="index" handler={Index} />
        <NotFoundRoute name="four04" handler={four04} />
    </Route>
);

export default routes;
