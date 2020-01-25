const {Writable} = require('stream');

module.exports = devNull;

function devNull() {
    return new Writable({
        write(chunk, encoding, callback) {
            setImmediate(callback);
        },
    });
}
