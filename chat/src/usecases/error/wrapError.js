const ApiError = require('./ApiError');

module.exports = function(error) {
    if (error instanceof ApiError) return error;

    if (error.errors) return ApiError.validation(error);

    if (error.constructor.name === 'MongooseError') return ApiError.information(error.message);

    logger.error(error);
    return ApiError.internalServer();
};
