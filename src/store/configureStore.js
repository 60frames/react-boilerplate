import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';

const middleware = [
    thunk
];

if (process.env.BROWSER === 'true' && process.env.REDUX_LOGGER === 'true') {
    middleware.push(createLogger());
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            process.env.BROWSER === 'true' && window.devToolsExtension
                ? window.devToolsExtension() : f => f
        )
    );

    /* eslint-disable */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    /* eslint-enable */

    return store;
}
