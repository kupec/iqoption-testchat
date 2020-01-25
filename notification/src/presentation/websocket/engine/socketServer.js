const ws = require('ws');
const config = require('../../../config');
const notificationStream = require('../../../domain/NotificationStream');

const port = Number(config.port);

module.exports = {start};

async function start(argument) {
    const server = new ws.Server({port});

    server.on('connection', socket => {
        const listener = message => {
            socket.send(message);
        };
        notificationStream.on('notification', listener);

        socket.on('close', () => {
            notificationStream.removeListener('notification', listener);
        });
    });
}
