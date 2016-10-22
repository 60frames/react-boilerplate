import NetworkError from 'utils/networkerror/NetworkError';

describe('utils/networkerror/NetworkError', () => {

    it('extends `Error`', () => {
        expect(new NetworkError()).toBeInstanceOf(Error);
    });

    it('defines `message`', () => {
        expect(new NetworkError('Foo bar').message).toBe('Foo bar');
    });

    it('defines `status`', () => {
        expect(new NetworkError(void 0, 404).status).toBe(404);
    });

    it('defines `response`', () => {
        expect(new NetworkError(void 0, 404, {
            foo: 'bar'
        }).response).toEqual({
            foo: 'bar'
        });
    });

    it('`response` defaults to an object', () => {
        expect(new NetworkError().response).toEqual({});
    });

});
