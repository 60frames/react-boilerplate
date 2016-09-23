import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from 'reducers/posts';

const rootReducer = combineReducers({
    posts,
    routing: routerReducer
});

export default rootReducer;
