#!/bin/bash


echo "Hello World"
docker compose stop
docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker rmi $(docker images -qa -f 'dangling=true')
docker-compose up -d --no-deps --build postgre
exit

