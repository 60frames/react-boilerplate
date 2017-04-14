import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import quote from 'reducers/quote/quote';

const createRootReducer = extraReducers => {
    return combineReducers({
        // quote,
        routing: routerReducer,
        ...extraReducers
    });
};

// const rootReducer = combineReducers({
//     quote,
//     routing: routerReducer
// });

export default createRootReducer;
