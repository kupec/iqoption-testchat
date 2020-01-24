const ApiError = require('./error/ApiError');
const MessageRepository = require('../domain/MessageRepository');
const RoomRepository = require('../domain/RoomRepository');
const Room = require('../datasource/models/RoomModel');
const User = require('../datasource/models/UserModel');

module.exports = {
    getRoomList,
    getRoomMessages,
};

async function getRoomList() {
    return await RoomRepository.findAll();
}

async function getRoomMessages(roomId) {
    return await MessageRepository.findAllInRoom(roomId, [User, Room]);
}
