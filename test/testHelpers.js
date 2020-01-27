const assert = require('assert');

module.exports = {
    assertSocketOpen,
    assertEvent,
};

async function assertSocketOpen(socket) {
    await assertEvent({
        target: socket,
        event: 'open',
        timeout: 2000,
        message: 'Cannot open ws connection',
    });
}

async function assertEvent({target, event, timeout, message}) {
    return new Promise((resolve, reject) => {
        const timeoutHandle = setTimeout(() => {
            reject(new assert.AssertionError({message}));
        }, timeout);

        target.once(event, () => {
            clearTimeout(timeoutHandle);
            resolve();
        });
    });
}
