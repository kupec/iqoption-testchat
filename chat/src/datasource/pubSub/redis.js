const promiseUtil = require('../../util/promiseUtil');
const redis = require('redis');
const config = require('../../config');

module.exports = {
    createClient,
};

function createClient() {
    const clientPromise = promiseUtil.createControlledPromise();

    const client = redis.createClient({
        url: config.redisUrl,
    });
    client.on('ready', () => clientPromise.resolve(client));
    client.on('error', error => clientPromise.reject(error));

    return clientPromise.promise;
}
