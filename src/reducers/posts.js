import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../actions';

function posts(state = {
    isFetching: false,
    error: false,
    lastUpdated: 0,
    data: []
}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
}

export default posts;
