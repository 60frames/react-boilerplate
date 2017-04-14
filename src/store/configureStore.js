import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createRootReducer from 'reducers';

const middleware = [
    thunk
];

if (process.env.BROWSER === 'true' && process.env.REDUX_LOGGER === 'true') {
    middleware.push(logger);
}

export default function configureStore(initialState) {
    const store = createStore(
        createRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            process.env.BROWSER === 'true' && window.devToolsExtension
                ? window.devToolsExtension() : f => f
        )
    );

    store.asyncReducersRegistry = {};

    /* eslint-disable */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // TODO.
            // const nextCreateRootReducer = require('../reducers').default;
            // store.replaceReducer(nextCreateRootReducer(store.asyncReducersRegistry));
        });
    }
    /* eslint-enable */

    return store;
}
