#!/bin/bash


echo "Hello World"

export PROPERTY=${PROPERTY:-dev}
if [ ! "${PROPERTY}" = 'dev' ] 
then 
  echo 'NGINX_PORT=80' >> .env
  echo 'REACT_APP_DOMAIN_URL=https://auctionforfun.site/' >> .env
  echo 'NGINX_CONFIG_PART=./config/nginx.conf' >> .env
else
  echo 'NGINX_PORT=8081' >> .env
  echo 'REACT_APP_DOMAIN_URL=http://localhost:8080/' >> .env
  echo 'NGINX_CONFIG_PART=./config/nginx.local.conf' >> .env
fi

docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
docker rmi $(docker images -qa -f 'dangling=true')
docker compose up -d --build --force-recreate --no-deps backend frontend nginx
docker compose up -d --build --no-deps postgre

exit

