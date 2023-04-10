#!/bin/bash


echo "Hello World"
docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker rmi $(docker images -qa -f 'dangling=true')
docker-compose up -d --force-recreate --build --no-deps postgre
exit

