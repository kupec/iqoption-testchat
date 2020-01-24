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
}

function initializeModels() {
    const modelFolder = path.join(__dirname, 'models');
    fs.readdirSync(modelFolder)
        .filter(fileName => fileName.match(/(.*Model)\.js$/))
        .forEach(fileName => require(path.join(modelFolder, fileName)));
}
