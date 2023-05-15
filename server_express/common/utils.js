const promiseHandler = (promise) => {

    return promise
        .then((data) => ([data, undefined]))
        .catch((err) =>  Promise.resolve([undefined, err]));
}

class ApiError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}

module.exports = {
    promiseHandler,
    ApiError
};