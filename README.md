# IQ Option test chat

## Overview

Components:

-   nginx load balancer
-   chat microservice
-   notification microservice
-   postgres
-   redis (as message broker)

Database initialization script is `test/init.sql`

Docker container orchestrator is hand-made. The script `control.sh` is frontent, `load_balancer` contains additional script for modifying nginx config.

## Run tests

```
bash ./test.sh
```

It runs `docker-compose` with clear database, run init.sql script, run mocha tests and tear down containers.

## Deploy production

```
bash ./control.sh prod 4 3
```

where `4 3` are numbers of chat/notification instances
