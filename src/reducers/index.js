import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import quote from 'reducers/quote/quote';

const rootReducer = combineReducers({
    quote,
    routing: routerReducer
});

export default rootReducer;
