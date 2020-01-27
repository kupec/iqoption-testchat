const {expect} = require('chai');

const {requestChatRooms, requestRoomMessages, postRoomMessage} = require('./chatApi');
const {openWebSocket, getNextWebSocketMessage} = require('./notificationApi');
const {assertSocketOpen} = require('./testHelpers');

describe('Integration test', function() {
    const tearDownList = [];
    function tearDown(fn) {
        tearDownList.push(fn);
    }

    after(function() {
        for (const fn of tearDownList) {
            fn();
        }
    });

    it('Case 1', async function() {
        this.timeout(200);

        const socket = openWebSocket(tearDown);
        await assertSocketOpen(socket);

        const rooms = await requestChatRooms();
        expect(rooms).deep.include({id: 200, name: 'First room'});
        expect(rooms).deep.include({id: 201, name: 'Second room'});

        let messages = await requestRoomMessages(200);
        expect(messages[0]).deep.equal({
            text: 'test',
            room: {id: 200, name: 'First room'},
            user: {id: 100, name: 'John Doe'},
        });

        await postRoomMessage(201, 'test2', {token: 'token1'});
        const message = await getNextWebSocketMessage();
        expect(message).deep.equal({
            text: 'test2',
            room: {id: 201, name: 'Second room'},
            user: {id: 100, name: 'John Doe'},
        });

        messages = await requestRoomMessages(201);
        const lastMessage = messages.pop();
        expect(lastMessage).deep.equal({
            text: 'test2',
            room: {id: 201, name: 'Second room'},
            user: {id: 100, name: 'John Doe'},
        });
    });
});
