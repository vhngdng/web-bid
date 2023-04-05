#!/bin/bash





dockerCompose="./docker-compose.yml"
if [ -e "$dockerCompose" ] 
then 
  rm "$dockerCompose"
  rsync -ravh docker-compose.yml $USER@$DIGITALOCEAN_DROPLET_IP:./docker-compose.yml
fi

[ ! -e .env ] && rsync -ravh .env $USER@$DIGITALOCEAN_DROPLET_IP:./.env

docker compose up -d --build

exit

