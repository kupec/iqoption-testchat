const _ = require('lodash');
const camelCase = require('camelcase');

const defaultConfig = require('./default');

module.exports = generateConfig();

function generateConfig() {
    return {
        ...defaultConfig,
        ...readConfig(),
    };
}

function readConfig() {
    if (process.env.LOCAL_CONFIG_FILE) return require('./local');
    else return _.mapKeys(process.env, (value, key) => camelCase(key));
}
