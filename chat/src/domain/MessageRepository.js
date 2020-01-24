const Message = require('../datasource/models/MessageModel');

module.exports = {
    create,
    findAllInRoom,
};

async function create({text, userId, roomId}) {
    return await Message.create({
        text,
        userId,
        roomId,
    });
}

async function findAllInRoom(roomId, includeModels = []) {
    return await Message.findAll({
        where: {
            roomId,
        },
        include: includeModels.map(model => ({model})),
    });
}
