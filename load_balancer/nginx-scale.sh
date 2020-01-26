#!/bin/sh
set -e

FILE=default.conf

# Update chat entries

LINE_NUMBER=$(grep -n 'upstream chat' "$FILE" | cut -f1 -d:)
sed -i '/server iqoption-testchat_chat/d' "$FILE"

{
    for i in $(seq 1 "$1"); do
        echo "    server iqoption-testchat_chat_${i};"
    done;
} | sed -i "$LINE_NUMBER r /dev/stdin" "$FILE"

# Update notification entries

LINE_NUMBER=$(grep -n 'upstream notification' "$FILE" | cut -f1 -d:)
sed -i '/server iqoption-testchat_notification/d' "$FILE"

{
    for i in $(seq 1 "$2"); do
        echo "    server iqoption-testchat_notification_${i};"
    done;
} | sed -i "$LINE_NUMBER r /dev/stdin" "$FILE"

for i in $(seq 5); do
    if nginx -s reload; then
        break;
    fi;
    sleep 1;
done;
