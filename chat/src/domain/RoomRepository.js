module.exports = {
    find,
};

async function find(id) {
    return await Room.findOne({
        where: {id},
    });
}
