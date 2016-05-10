import 'css-reset';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer
        component={Root}
        props={{ store, history }}
    />,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        render(
            <AppContainer
                component={require('./containers/Root').default}
                props={{ store, history }}
            />,
            document.getElementById('root')
        );
    });
}
