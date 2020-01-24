const Room = require('../datasource/models/RoomModel');

module.exports = {
    find,
    findAll,
};

async function find(id) {
    return await Room.findByPk(id);
}

async function findAll(id) {
    return await Room.findAll();
}
