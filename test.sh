#!/bin/bash

function tearDown {
    ./control.sh test down
}

./control.sh test up 3 3
trap tearDown EXIT

echo 'Waiting 3 seconds for containers are ready...';
sleep 3;

echo 'Initialize database';
docker exec -i iqoption-testchat_postgres_1 psql postgres postgres < test/init.sql


echo 'Killing first instances of chat and notification microservices';
docker stop iqoption-testchat_chat_1
docker stop iqoption-testchat_notification_1

docker run -it --network host iqoption-testchat_test npm test && echo 'TESTS: OK';
read -p "Containers are going to be destroyed. Press ENTER to continue";
