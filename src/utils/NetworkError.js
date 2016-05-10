import ExtendableError from './ExtendableError';

class NetworkError extends ExtendableError {
    constructor(message, status, json = {}) {
        super(message);
        this.status = status;
        this.response = json;
    }
}

export default NetworkError;
