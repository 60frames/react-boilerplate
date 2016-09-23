/* global jest */
/* eslint-env jasmine */

jest.mock('utils/fetch');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'utils/fetch';
import {
    FETCH_POSTS,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    fetchPostsIfNeeded
} from 'actions/posts/posts';

const mockStore = configureMockStore([
    thunk
]);

describe('actions/index', () => {

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockReturnValue(Promise.resolve({}));
    });

    it('creates FETCH_POSTS', () => {
        const store = mockStore({
            posts: {
                data: [],
                isFetching: false
            }
        });
        store.dispatch(fetchPostsIfNeeded());
        const action = store.getActions()[0];
        expect(action).toEqual({
            type: FETCH_POSTS
        });
    });

    it('does not create FETCH_POSTS or call the api when data already exists', () => {
        const store = mockStore({
            posts: {
                data: [{}, {}, {}],
                isFetching: false
            }
        });
        store.dispatch(fetchPostsIfNeeded());
        expect(store.getActions().length).toBeFalsy();
        expect(fetch).not.toBeCalled();
    });

    it('does not create FETCH_POSTS or call the api when already fetching', () => {
        const store = mockStore({
            posts: {
                data: [],
                isFetching: true
            }
        });
        store.dispatch(fetchPostsIfNeeded());
        expect(store.getActions().length).toBeFalsy();
        expect(fetch).not.toBeCalled();
    });

    it('creates FETCH_POSTS_SUCCESS when a successful response is received', () => {
        const response = { foo: 'bar' };
        fetch.mockReturnValue(Promise.resolve(response));
        const store = mockStore({
            posts: {
                data: [],
                isFetching: false
            }
        });
        return store.dispatch(fetchPostsIfNeeded())
            .then(() => {
                const action = store.getActions()[1];
                expect(action).toEqual({
                    type: FETCH_POSTS_SUCCESS,
                    receivedAt: jasmine.any(Number),
                    data: {
                        foo: 'bar'
                    }
                });
            });
    });

    it('creates FETCH_POSTS_FAILURE when a failed response is received', () => {
        const response = { foo: 'bar' };
        fetch.mockReturnValue(Promise.reject(response));
        const store = mockStore({
            posts: {
                data: [],
                isFetching: false
            }
        });
        return store.dispatch(fetchPostsIfNeeded())
            .then(() => {
                const action = store.getActions()[1];
                expect(action).toEqual({
                    type: FETCH_POSTS_FAILURE,
                    error: {
                        foo: 'bar'
                    }
                });
            });
    });

});
