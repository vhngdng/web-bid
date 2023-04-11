#!/bin/bash


echo "Hello World"
export PROPERTY=${PROPERTY:-dev}
if [ ! "${PROPERTY}" = 'dev' ] 
then 
  export NGINX_PORT=80
  export REACT_APP_DOMAIN_URL=https://auctionforfun.site/ 
  export NGINX_CONFIG_PART=./config/nginx.conf 

else
  export NGINX_PORT=8081
  export REACT_APP_DOMAIN_URL=http://localhost:8080/
  export NGINX_CONFIG_PART=./config/nginx.local.conf 

fi

docker pull vuhoangdung/web-bid-frontend:latest && docker pull vuhoangdung/web-bid-backend:latest
docker compose stop
docker rmi $(docker images -qa -f 'dangling=true')
docker compose up -d --build --force-recreate --no-deps backend frontend nginx
exit

