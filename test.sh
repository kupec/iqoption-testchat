#!/bin/bash

./control.sh test up 2 2
docker exec -i iqoption-testchat_postgres_1 psql postgres postgres < test/init.sql
