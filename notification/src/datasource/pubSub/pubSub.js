const redis = require('./redis');

module.exports = {
    async subscribe(channel) {
        const client = await redis.createClient();
        client.subscribe(channel);
        return client;
    },
};
