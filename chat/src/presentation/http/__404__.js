const response = require('./helpers/response');
const ApiError = require('../../domain/error/ApiError');

module.exports = function(req, res, next) {
    response.sendError(res, ApiError.notFound());
};
