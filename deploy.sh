#!/bin/bash


echo "Hello World"
docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose up -d --build
docker rmi $(docker images -qf "dangling=true")
exit

