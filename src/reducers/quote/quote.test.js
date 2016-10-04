import reducer from './quote';
import {
    FETCH_QUOTE_REQUEST,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_FAILURE
} from 'actions/quote/quote';

describe('reducers/quote/quote', () => {

    it('returns the initial state', () => {
        expect(
            reducer(void 0, {})
        ).toEqual({
            isFetching: false,
            error: false,
            lastUpdated: 0,
            value: ''
        });
    });

    it('handles FETCH_QUOTE_REQUEST', () => {
        const action = {
            type: FETCH_QUOTE_REQUEST
        };
        const state = {
            isFetching: false,
            error: false,
            lastUpdated: 0,
            value: ''
        };
        expect(
            reducer(state, action)
        ).toEqual({
            isFetching: true,
            error: false,
            lastUpdated: 0,
            value: ''
        });
    });

    it('handles FETCH_QUOTE_SUCCESS', () => {
        const action = {
            type: FETCH_QUOTE_SUCCESS,
            payload: 'A quote'
        };
        const state = {
            isFetching: true,
            error: false,
            lastUpdated: 0,
            value: ''
        };
        expect(
            reducer(state, action)
        ).toEqual({
            isFetching: false,
            error: false,
            lastUpdated: 0,
            value: 'A quote'
        });
    });

    it('handles FETCH_QUOTE_FAILURE', () => {
        const action = {
            type: FETCH_QUOTE_FAILURE,
            payload: 'Error'
        };
        const state = {
            isFetching: true,
            error: false,
            lastUpdated: 0,
            value: ''
        };
        expect(
            reducer(state, action)
        ).toEqual({
            isFetching: false,
            error: 'Error',
            lastUpdated: 0,
            value: ''
        });
    });

});
