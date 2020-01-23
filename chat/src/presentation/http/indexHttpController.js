const express = require('express');
const router = express.Router();
const response = require('./helpers/response');

module.exports = {
    path: '',
    router,
};

router.get('/', function(req, res, next) {
    response.sendAnswer(res, {
        server: 'ready',
    });
});
