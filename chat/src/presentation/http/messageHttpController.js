const express = require('express');
const router = express.Router();
const response = require('./helpers/response');
const watchError = require('./helpers/watchError');

module.exports = {
    path: 'message',
    router,
};

const MessageInteractor = require('../../usecases/MessageInteractor');

router.post(
    '/',
    watchError(async function(req, res, next) {
        const {text, roomId} = req.body;
        const user = {
            id: 3,
            name: 'debug',
        };
        const {room} = await MessageInteractor.sendMessage({text, user, roomId});

        response.sendAnswer(res, {
            text,
            user,
            room,
        });
    })
);
