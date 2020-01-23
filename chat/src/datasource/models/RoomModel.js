const Sequelize = require('sequelize');
const {sequelize} = require('../databaseLayer');

class Room extends Sequelize.Model {}
Room.init(
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'room',
    }
);

module.exports = Room;
