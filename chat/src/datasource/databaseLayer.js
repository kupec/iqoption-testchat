const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(
    `postgres://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort || 5432}/${config.dbName}`,
    {
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

module.exports = {
    init,
    sequelize,
};

async function init() {
    await sequelize.authenticate();
    initializeModels();
    await sequelize.sync();

    const Room = require('./models/RoomModel');
    const User = require('./models/UserModel');
    await Room.create({
        name: 'first room',
    });
    await Room.create({
        name: 'second room',
    });
    await User.create({
        name: 'Jonh Doe',
    });
    await User.create({
        name: 'Matt	North',
    });
}

function initializeModels() {
    const modelFolder = path.join(__dirname, 'models');
    fs.readdirSync(modelFolder)
        .filter(fileName => fileName.match(/(.*Model)\.js$/))
        .forEach(fileName => require(path.join(modelFolder, fileName)));
}
