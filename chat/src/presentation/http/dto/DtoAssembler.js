module.exports = {
    assemble,
};

const registry = {
    User: require('./UserDto'),
    Room: require('./RoomDto'),
    Message: require('./MessageDto'),
};

function assemble(dtoKey, data) {
    const assembleFunction = registry[dtoKey];
    if (!assembleFunction) {
        throw new Error('No dto assembler for ' + dtoKey);
    }

    return assembleFunction(data, module.exports);
}
