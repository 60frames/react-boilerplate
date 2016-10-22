/* global jest */
/* eslint-env jasmine */

jest.mock('utils/fetch/fetch');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'utils/fetch/fetch';
import {
    FETCH_QUOTE_REQUEST,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_FAILURE,
    fetchQuoteIfNeeded
} from 'actions/quote/quote';

const mockStore = configureMockStore([
    thunk
]);

describe('actions/quote/quote', () => {

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockReturnValue(Promise.resolve({}));
    });

    it('creates FETCH_QUOTE_REQUEST', () => {
        const store = mockStore({
            quote: {
                value: '',
                isFetching: false
            }
        });
        store.dispatch(fetchQuoteIfNeeded());
        const action = store.getActions()[0];
        expect(action).toEqual({
            type: FETCH_QUOTE_REQUEST
        });
    });

    it('does not create FETCH_QUOTE_REQUEST or call the api when data already exists', () => {
        const store = mockStore({
            quote: {
                value: 'A quote',
                isFetching: false
            }
        });
        store.dispatch(fetchQuoteIfNeeded());
        expect(store.getActions().length).toBeFalsy();
        expect(fetch).not.toBeCalled();
    });

    it('does not create FETCH_QUOTE_REQUEST or call the api when already fetching', () => {
        const store = mockStore({
            quote: {
                value: '',
                isFetching: true
            }
        });
        store.dispatch(fetchQuoteIfNeeded());
        expect(store.getActions().length).toBeFalsy();
        expect(fetch).not.toBeCalled();
    });

    it('creates FETCH_QUOTE_SUCCESS when a successful response is received', () => {
        const response = { quote: 'A quote' };
        fetch.mockReturnValue(Promise.resolve(response));
        const store = mockStore({
            quote: {
                value: '',
                isFetching: false
            }
        });
        return store.dispatch(fetchQuoteIfNeeded())
            .then(() => {
                const action = store.getActions()[1];
                expect(action).toEqual({
                    type: FETCH_QUOTE_SUCCESS,
                    meta: {
                        receivedAt: jasmine.any(Number)
                    },
                    payload: 'A quote'
                });
            });
    });

    it('creates FETCH_QUOTE_FAILURE when a failed response is received', () => {
        const response = { message: 'Error' };
        fetch.mockReturnValue(Promise.reject(response));
        const store = mockStore({
            quote: {
                value: '',
                isFetching: false
            }
        });
        return store.dispatch(fetchQuoteIfNeeded())
            .then(() => {
                const action = store.getActions()[1];
                expect(action).toEqual({
                    type: FETCH_QUOTE_FAILURE,
                    payload: 'Error'
                });
            });
    });

});
