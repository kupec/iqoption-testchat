const Room = require('../datasource/models/RoomModel');

module.exports = {
    find,
};

async function find(id) {
    return await Room.findByPk(id);
}
