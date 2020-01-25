module.exports = function(req) {
    return req.query.accessToken || req.cookies.sessionId;
};
