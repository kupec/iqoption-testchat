const redis = require('./redis');
const redisPubPromise = redis.createClient();

module.exports = {
    async send(channel, message) {
        const redisPub = await redisPubPromise;
        redisPub.publish(channel, JSON.stringify(message));
    },
};
