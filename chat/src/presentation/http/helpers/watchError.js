module.exports = function(expressMethod) {
    return async function(req, res, next) {
        try {
            await expressMethod(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
