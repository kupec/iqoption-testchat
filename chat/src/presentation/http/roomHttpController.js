const express = require('express');
const router = express.Router();
const response = require('./helpers/response');
const watchError = require('./helpers/watchError');
const DtoAssembler = require('./dto/DtoAssembler');

module.exports = {
    path: 'room',
    router,
};

const RoomInteractor = require('../../usecases/RoomInteractor');

router.get(
    '/',
    watchError(async function(req, res, next) {
        const rooms = await RoomInteractor.getRoomList();

        response.sendAnswer(
            res,
            rooms.map(room => DtoAssembler.assemble('Room', room))
        );
    })
);

router.get(
    '/:roomId/messages',
    watchError(async function(req, res, next) {
        const {roomId} = req.params;
        const messages = await RoomInteractor.getRoomMessages(roomId);

        response.sendAnswer(
            res,
            messages.map(message => DtoAssembler.assemble('Message', message))
        );
    })
);
