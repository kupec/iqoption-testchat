const ApiError = require('./error/ApiError');
const MessageRepository = require('../domain/MessageRepository');
const RoomRepository = require('../domain/RoomRepository');
const pubSub = require('../datasource/pubSub/pubSub');

module.exports = {
    sendMessage,
};

async function sendMessage({text, user, roomId}) {
    if (!text || !roomId) {
        throw ApiError.badRequest();
    }

    const room = await RoomRepository.find(roomId);
    if (!room) {
        throw ApiError.notFound('Not found: room not found');
    }

    await MessageRepository.create({
        text,
        userId: user.id,
        roomId: room.id,
    });

    await pubSub.send('iqoption-testchat:notification', {
        text,
        room,
        user,
    });

    return {text, room, user};
}
