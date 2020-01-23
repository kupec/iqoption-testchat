const Sequelize = require('sequelize');
const {sequelize} = require('../databaseLayer');

class User extends Sequelize.Model {}
User.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
);

module.exports = User;
