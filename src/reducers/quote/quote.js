import {
    FETCH_QUOTE_REQUEST,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_FAILURE
} from 'actions/quote/quote';

function quote(state = {
    isFetching: false,
    error: false,
    lastUpdated: 0,
    value: ''
}, action) {
    switch (action.type) {
        case FETCH_QUOTE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            };
        case FETCH_QUOTE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                value: action.payload
            };
        case FETCH_QUOTE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default quote;
