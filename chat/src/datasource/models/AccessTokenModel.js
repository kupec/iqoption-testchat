const Sequelize = require('sequelize');
const {sequelize} = require('../databaseLayer');
const User = require('./UserModel');

class AccessToken extends Sequelize.Model {}
AccessToken.init(
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'accessToken',
    }
);

AccessToken.belongsTo(User);

module.exports = AccessToken;
