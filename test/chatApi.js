const url = require('url');
const fetch = require('node-fetch');
const {API_HOST} = require('./config');

const CHAT_URL = `http://${API_HOST}:4000/`;

module.exports = {
    requestChatRooms,
    requestRoomMessages,
    postRoomMessage,
};

async function requestChatRooms() {
    return await fetch(makeURL('/room')).then(x => x.json());
}

function makeURL(relativeURL) {
    return url.resolve(CHAT_URL, relativeURL);
}

async function requestRoomMessages(roomId) {
    return await fetch(makeURL(`/room/${roomId}/messages`)).then(x => x.json());
}

async function postRoomMessage(roomId, text, {token}) {
    const data = {
        text,
        roomId,
    };

    return await fetch(makeURL(`/message`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `sessionId=${token}`,
        },
        body: JSON.stringify(data),
    }).then(x => x.json());
}
