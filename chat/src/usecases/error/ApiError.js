class ApiError extends Error {
    static badRequest() {
        return new ApiError('Bad request: required parameters missing or invalid', 400);
    }

    static unauthorizedError(message = 'Not authorized') {
        return new ApiError(message, 401);
    }

    static internalServer() {
        return new ApiError('Internal Server Error', 500);
    }

    static notFound(errorMessage = 'Not found') {
        return new ApiError(errorMessage, 404);
    }

    constructor(message, code, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
    }
}

module.exports = ApiError;
