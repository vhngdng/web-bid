#!/bin/bash


echo "Hello World"

export PROPERTY=${PROPERTY:-dev}
if [ "${PROPERTY}" = 'dev' ] 
then 
  [ ! -z ${PROPERTY} ] && echo 'PROPERTY=dev' >> .env
  [ ! -z ${NGINX_PORT} ] && echo 'NGINX_PORT=80' >> .env
  [ ! -z ${REACT_APP_DOMAIN_URL} ] && echo 'REACT_APP_DOMAIN_URL=https://auctionforfun.site/' >> .env
  [ ! -z ${NGINX_CONFIG_PART} ] && echo 'NGINX_CONFIG_PART=./config/nginx.conf' >> .env
else
  [ ! -z ${PROPERTY} ] && echo 'PROPERTY=local' >> .env
  [ ! -z ${NGINX_PORT} ] && echo 'NGINX_PORT=8081' >> .env
  [ ! -z ${REACT_APP_DOMAIN_URL} ] && echo 'REACT_APP_DOMAIN_URL=http://localhost:8380/' >> .env
  [ ! -z ${NGINX_CONFIG_PART} ] && echo 'NGINX_CONFIG_PART=./config/nginx.local.conf' >> .env
fi

docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
docker rmi $(docker images -qa -f 'dangling=true')
docker compose up -d --build --force-recreate --no-deps backend frontend nginx
docker compose up -d --build --no-deps postgre

exit

