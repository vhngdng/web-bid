#!/bin/bash


echo "Hello World"

export PROPERTY=${PROPERTY:-dev}
if [ "${PROPERTY}" = 'dev' ] 
then 
  echo 'PROPERTY=dev' >> .env
  echo 'NGINX_PORT=80' >> .env
  echo 'REACT_APP_DOMAIN_URL=https://auctionforfun.site/' >> .env
  echo 'NGINX_CONFIG_PART=./config/nginx.conf' >> .env
  echo 'WDS_SOCKET_PORT=443' >> .env
  echo 'WDS_SOCKET_PATH=/api/v1/ws' >> .env
else
  ( ! cat .env | grep "PROPERTY" ) && echo "PROPERTY=local" >> .env
  ( ! cat .env | grep "NGINX_PORT" ) && echo 'NGINX_PORT=8081' >> .env
  ( ! cat .env | grep "REACT_APP_DOMAIN_URL" ) && echo 'REACT_APP_DOMAIN_URL=http://localhost:8080/' >> .env
  ( ! cat .env | grep "NGINX_CONFIG_PART" ) && echo 'NGINX_CONFIG_PART=./config/nginx.local.conf' >> .env
fi

docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
docker compose up -d --build --force-recreate --no-deps backend frontend nginx
docker compose up -d --build --no-deps postgre
## clear dangling
docker rmi $(docker images -qa -f 'dangling=true')

exit

