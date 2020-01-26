#!/bin/bash
set -e

ENV="$1"
shift;
COMMAND="$1"
shift;

function stack_up {
    CHAT_SCALE="${1:-1}"
    NOTIFICATION_SCALE="${2:-1}"
    FLAGS="$3"
    docker-compose -f docker-compose.base.yml -f "docker-compose.$ENV.yml" up -d --scale "chat=$CHAT_SCALE" --scale "notification=$NOTIFICATION_SCALE" $FLAGS
    docker exec iqoption-testchat_lb_1 sh nginx-scale.sh "$CHAT_SCALE" "$NOTIFICATION_SCALE"
}

function stack_down {
    docker-compose -f docker-compose.base.yml -f "docker-compose.$ENV.yml" down
}

case "$COMMAND" in
    up)
        stack_up "$@" --build
        ;;

    down)
        stack_down
        ;;

    scale)
        stack_up "$@"
        ;;
esac;
