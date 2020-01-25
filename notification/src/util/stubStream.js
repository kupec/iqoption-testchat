const {Readable} = require('stream');
const {Buffer} = require('buffer');

module.exports = stubStream;

const stubSize = 4096;
const stub = new Array(stubSize + 1).join('%');

function stubStream(maxCount) {
    return new StubStream(maxCount);
}

class StubStream extends Readable {
    constructor(maxCount) {
        super();
        this.maxCount = maxCount;
        this.pushCount = 0;
    }

    _read() {
        if (this.pushCount >= this.maxCount) {
            this.push(null);
            return;
        }

        this.push(stub);
        this.pushCount += stubSize;
    }
}
