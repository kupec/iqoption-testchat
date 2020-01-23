const Sequelize = require('sequelize');
const {sequelize} = require('../databaseLayer');
const Room = require('./RoomModel');
const User = require('./UserModel');

class Message extends Sequelize.Model {}
Message.init(
    {
        text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'message',
    }
);

Message.belongsTo(Room);
Message.belongsTo(User);

module.exports = Message;
