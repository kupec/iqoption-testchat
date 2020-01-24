const AccessToken = require('../../datasource/models/AccessTokenModel');

module.exports = {
    findUserByToken,
};

async function findUserByToken(token) {
    const accessTokenModel = await AccessToken.findByPk(token);
    if (!accessTokenModel) {
        throw new Error('No access token');
    }

    return await accessTokenModel.getUser();
}
