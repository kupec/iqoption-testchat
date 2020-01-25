module.exports = {
    makeCallback() {
        let callback;

        const promise = new Promise((resolve, reject) => {
            callback = function(error, result) {
                if (error) return reject(error);

                return resolve(result);
            };
        });

        callback.promise = promise;

        return callback;
    },

    createControlledPromise() {
        let resolve, reject;

        const promise = new Promise((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        return {
            promise,
            resolve,
            reject,
        };
    },
};
