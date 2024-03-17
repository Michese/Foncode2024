#!/bin/sh

if grep -qF "172.20.1.10 localhost" /etc/hosts; then
    echo "Entry already exists in /etc/hosts"
else
    echo -e "172.20.1.10 localhost" | sudo tee -a /etc/hosts >/dev/null
    echo "Entry added to /etc/hosts"
fi

docker compose up --build