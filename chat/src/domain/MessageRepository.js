module.exports = {
    create,
};

async function create({text, userId, roomId}) {
    return await Message.create({
        text,
        userId,
        roomId,
    });
}
