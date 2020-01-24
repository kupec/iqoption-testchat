const express = require('express');
const router = express.Router();
const response = require('./helpers/response');
const watchError = require('./helpers/watchError');
const checkAuth = require('./helpers/checkAuth');

module.exports = {
    path: 'message',
    router,
};

const MessageInteractor = require('../../usecases/MessageInteractor');

router.post(
    '/',
    checkAuth({
        role: 'base',
        errorMessage: 'Not authorized: only authorized users can send messages',
    }),
    watchError(async function(req, res, next) {
        const {text, roomId} = req.body;
        const {user} = req;
        const {room} = await MessageInteractor.sendMessage({text, user, roomId});

        response.sendAnswer(res, {
            text,
            user,
            room,
        });
    })
);
