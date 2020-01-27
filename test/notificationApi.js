const assert = require('assert');
const WebSocket = require('ws');
const {API_HOST} = require('./config');

const NOTIFICATION_URL = `ws://${API_HOST}:4000/ws`;

const messages = [];
let messageResolve = null;
let messagePromise = new Promise(resolve => (messageResolve = resolve));

module.exports = {
    openWebSocket,
    getNextWebSocketMessage,
};

function openWebSocket(tearDown) {
    const socket = new WebSocket(NOTIFICATION_URL);
    tearDown(() => {
        socket.close();
    });

    socket.once('error', console.warn);
    socket.on('message', message => {
        messages.push(JSON.parse(message));
        messageResolve();
        messagePromise = new Promise(resolve => (messageResolve = resolve));
    });

    return socket;
}

async function getNextWebSocketMessage({timeout}) {
    if (messages.length === 0) {
        await Promise.race([messagePromise, makeTimeout('Cannot get websocket message due timeout', timeout)]);
    }

    return messages.shift();
}

async function makeTimeout(message, timeout) {
    return new Promise((_, reject) =>
        setTimeout(() => {
            reject(new assert.AssertionError({message}));
        }, timeout)
    );
}
