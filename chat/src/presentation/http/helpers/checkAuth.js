const ApiError = require('../../../usecases/error/ApiError');
const {findUserByToken} = require('../../../domain/auth/auth');
const findAccessToken = require('./findAccessToken');

module.exports = options => (req, res, next) => {
    doCheckAuth(req, res, options)
        .then(() => next())
        .catch(next);
};

async function doCheckAuth(req, res, options) {
    const accessToken = findAccessToken(req);

    if (!accessToken) {
        throw ApiError.unauthorizedError(options.errorMessage);
    }

    try {
        req.user = await findUserByToken(accessToken);
    } catch (error) {
        throw ApiError.unauthorizedError(options.errorMessage);
    }
}
