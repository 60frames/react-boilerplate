import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';

const rootReducer = combineReducers({
    posts,
    routing: routerReducer
});

export default rootReducer;
