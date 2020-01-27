const {EventEmitter} = require('events');
const pubSub = require('../datasource/pubSub/pubSub');

class NotificationStream extends EventEmitter {
    async start() {
        const pubSubEndpoint = await pubSub.subscribe('iqoption-testchat:notification');
        pubSubEndpoint.on('message', (channel, message) => {
            this.emit('notification', message);
        });
    }
}

const notificationStream = new NotificationStream();
notificationStream.start().catch(error => {
    console.error('Cannot access redis');
    process.exit(1);
});

module.exports = notificationStream;
