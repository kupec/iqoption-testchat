module.exports = function(req) {
    return req.body.accessToken || req.query.accessToken;
};
