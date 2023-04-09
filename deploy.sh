#!/bin/bash


echo "Hello World"
docker compose down
docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose up -d --build
exit

