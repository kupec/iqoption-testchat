const socketServer = require('./src/presentation/websocket/engine/socketServer');

socketServer.start().catch(error => {
    console.error(error);
    process.exit(1);
});
