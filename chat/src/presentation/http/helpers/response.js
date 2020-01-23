const wrapError = require('../../../usecases/error/wrapError');

module.exports = {
    sendAnswer(res, result) {
        res.send(result);
    },

    sendEmptyAnswer(res) {
        this.sendAnswer(res, {});
    },

    sendError(res, error) {
        const {code, message, details} = wrapError(error);

        res.status(code);
        res.send({
            error: message,
        });
    },
};
