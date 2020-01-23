const response = require('./helpers/response');

module.exports = function(error, req, res, next) {
    response.sendError(res, error);
};
