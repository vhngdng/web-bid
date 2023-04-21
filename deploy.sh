#!/bin/bash


echo "Hello World"

export PROPERTY=${PROPERTY:-dev}
docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
if [ "${PROPERTY}" = 'dev' ] 
then 
  ( ! cat .env | grep 'PROPERTY=dev' ) && echo 'PROPERTY=dev' >> .env
  ( ! cat .env | grep 'NGINX_PORT=80' ) && echo 'NGINX_PORT=80' >> .env
  ( ! cat .env | grep 'REACT_APP_DOMAIN_URL=https://auctionforfun.site/' ) && echo 'REACT_APP_DOMAIN_URL=https://auctionforfun.site/' >> .env
  ( ! cat .env | grep 'NGINX_CONFIG_PART=./config/nginx.conf' ) && echo 'NGINX_CONFIG_PART=./config/nginx.conf' >> .env
  ( ! cat .env | grep 'WDS_SOCKET_PORT=443' ) && echo 'WDS_SOCKET_PORT=443' >> .env
  ( ! cat .env | grep 'WDS_SOCKET_PATH=/api/v1/ws' ) && echo 'WDS_SOCKET_PATH=/api/v1/ws' >> .env
  docker compose up -d --build --force-recreate --no-deps backend frontend nginx
  docker compose up -d --build --no-deps postgre  
else
  ( ! cat .env | grep PROPERTY=local ) && echo "PROPERTY=local" >> .env
  (! cat .env | grep NGINX_PORT=8081 ) && echo 'NGINX_PORT=8081' >> .env
  (! cat .env | grep 'REACT_APP_DOMAIN_URL=http://localhost:8080/' ) && echo 'REACT_APP_DOMAIN_URL=http://localhost:8080/' >> .env
  (! cat .env | grep 'NGINX_CONFIG_PART=./config/nginx.local.conf' ) && echo 'NGINX_CONFIG_PART=./config/nginx.local.conf' >> .env
  docker compose -f docker-compose.local.yml up -d --build --force-recreate --no-deps backend frontend nginx &&
  docker compose -f docker-compose.local.yml up -d --build --no-deps postgre 
fi



## clear dangling
docker rmi $(docker images -qa -f 'dangling=true')

exit

