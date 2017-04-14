import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import routes from 'routes';
import { Router } from 'react-router';
import createRootReducer from 'reducers';

// TODO: Move to own module.
class InjectReducerProvider extends Component {
   getChildContext() {
     const store = this.props.store;
      return {
          injectReducer: reducerMap => {
            store.asyncReducersRegistry = {
              ...store.asyncReducersRegistry,
              ...reducerMap
            };
            store.replaceReducer(
              createRootReducer(store.asyncReducersRegistry)
            );
          }
      };
  }

    render() {
        return this.props.children;
    }
}

InjectReducerProvider.childContextTypes = {
  injectReducer: PropTypes.func
};

InjectReducerProvider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

function Root({ store, history }) {
    return (
        <Provider store={store}>
            <InjectReducerProvider store={store}>
                <Router history={history} routes={routes} />
            </InjectReducerProvider>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root;
