module.exports = function(message, dtoAssembler) {
    return {
        text: message.text,
        room: dtoAssembler.assemble('Room', message.room),
        user: dtoAssembler.assemble('User', message.user),
    };
};
