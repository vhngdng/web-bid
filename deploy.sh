#!/bin/bash


echo "Hello World"

docker compose up -d --force-recreate --build
docker system prune
exit

