import fetch from 'utils/fetch/fetch';

export const FETCH_QUOTE_REQUEST = 'FETCH_QUOTE_REQUEST';
export const FETCH_QUOTE_SUCCESS = 'FETCH_QUOTE_SUCCESS';
export const FETCH_QUOTE_FAILURE = 'FETCH_QUOTE_FAILURE';

function fetchQuoteFailure(error) {
    return {
        type: FETCH_QUOTE_FAILURE,
        payload: error.message
    };
}

function fetchQuoteSuccess(data) {
    return {
        type: FETCH_QUOTE_SUCCESS,
        meta: {
            receivedAt: Date.now()
        },
        payload: data.quote
    };
}

function fetchQuote() {
    return dispatch => {
        dispatch({
            type: FETCH_QUOTE_REQUEST
        });
        return fetch(`${process.env.API_ENDPOINT}/quote`)
            .then(
                data => dispatch(fetchQuoteSuccess(data)),
                error => dispatch(fetchQuoteFailure(error))
            );
    };
}

function shouldFetchQuote(state) {
    const quote = state.quote;
    return !(quote.value || quote.isFetching);
}

export function fetchQuoteIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchQuote(getState())) {
            return dispatch(fetchQuote());
        }
    };
}
