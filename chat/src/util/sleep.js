const _ = require('lodash');
const promiseUtil = require('./promiseUtil');

module.exports = function sleep(ms) {
    const doSleep = ms ? _.partial(setTimeout, _, ms) : setImmediate;
    const cancelSleep = ms ? clearTimeout : clearImmediate;

    const callback = promiseUtil.makeCallback();

    const timer = doSleep(callback);
    callback.promise.cancel = () => clearTimeout(timer);

    return callback.promise;
};
