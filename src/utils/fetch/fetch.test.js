jest.mock('isomorphic-fetch');

import isomorphicFetch from 'isomorphic-fetch';
import fetch from 'utils/fetch/fetch';

describe('utils/fetch/fetch', () => {

    let throwFn;

    beforeEach(() => {
        const response = new Response('{}', { status: 200 , statusText: 'OKs' });
        isomorphicFetch.mockClear();
        isomorphicFetch.mockReturnValue(Promise.resolve(response));
        throwFn = jest.fn(() => { throw new Error('expected `throwFn` not to be called') });
    });

    it('returns a promise', () => {
        expect(fetch('http://foo.com/bar')).toBeInstanceOf(Promise);
    });

    it('uses json headers by default', () => {
        fetch('http://foo.com/bar');
        expect(isomorphicFetch).toBeCalledWith('http://foo.com/bar', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });

    describe('successful responses', () => {

        it('handles valid json responses', () => {
            const response = new Response('{ "foo": "bar" }', { status: 200, statusText: 'OKs' });
            isomorphicFetch.mockReturnValue(Promise.resolve(response));
            return fetch('http://foo.com/bar')
                .then(data => {
                    expect(data).toEqual({ foo: 'bar' });
                });
        });

        it('handles invalid json responses', () => {
            const response = new Response('{ invalid json', { status: 200, statusText: 'OKs' });
            isomorphicFetch.mockReturnValue(Promise.resolve(response));
            return fetch('http://foo.com/bar')
                .then(throwFn, error => {
                    expect(error.message).toBe('Invalid JSON Response');
                });
        });

        [{
            status: 201,
            statusText: 'Created'
        }, {
            status: 204,
            statusText: 'No Content'
        }].forEach(({ status, statusText }) => {
            it(`handles ${status} responses`, () => {
                const response = new Response(void 0, { status, statusText });
                isomorphicFetch.mockReturnValue(Promise.resolve(response));
                return fetch('http://foo.com/bar')
                    .then(data => {
                        expect(data).toEqual({});
                    });
            });
        });

    });

    describe('unsuccessful responses', () => {

        it('handles valid json responses', () => {
            const response = new Response('{ "foo": "bar" }', { status: 400, statusText: 'Bad Request' });
            isomorphicFetch.mockReturnValue(Promise.resolve(response));
            return fetch('http://foo.com/bar')
                .then(throwFn, error => {
                    expect(error.status).toBe(400);
                    expect(error.message).toBe('Bad Request');
                    expect(error.response).toEqual({ foo: 'bar' });
                });
        });

        it('handles invalid json responses', () => {
            const response = new Response('{ invalid json', { status: 400, statusText: 'Bad Request' });
            isomorphicFetch.mockReturnValue(Promise.resolve(response));
            return fetch('http://foo.com/bar')
                .then(throwFn, error => {
                    expect(error.status).toBe(400);
                    expect(error.message).toBe('Bad Request');
                    expect(error.response).toEqual({});
                });
        });

        it('handles offline / cors errors', () => {
            isomorphicFetch.mockReturnValue(Promise.resolve({ message: 'Failed to fetch' }));
            return fetch('http://foo.com/bar')
                .then(throwFn, error => {
                    expect(error.status).toBe(void 0);
                    expect(error.message).toBe('Failed to fetch');
                    expect(error.response).toEqual({});
                });
        });

    });

});
