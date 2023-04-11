#!/bin/bash


echo "Hello World"
export PROPERTY=${PROPERTY:-dev}
if [ ! "${PROPERTY}" = 'dev' ] 
then 
  export NGINX_PORT=80 
else
  export NGINX_PORT=8081
fi

docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
docker rmi $(docker images -qa -f 'dangling=true')
docker compose up -d --build --force-recreate --no-deps backend frontend nginx
exit

