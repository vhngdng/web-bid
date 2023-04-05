#!/bin/bash

mkdir -p web-bid
cd web-bid

if [ ! -d config ] 
then
  scp -r /home/dung/Documents/web/config $USER@$DIGITALOCEAN_DROPLET_IP:./config
fi

dockerCompose="./docker-compose.yml"
if [ -e "$dockerCompose" ] 
then 
  rm "$dockerCompose"
  scp ./docker-compose.yml $USER@$DIGITALOCEAN_DROPLET_IP:./docker-compose.yml
fi

[ ! -e .env ] && scp /home/dung/Documents/web/.env $USER@$DIGITALOCEAN_DROPLET_IP:./.env

docker compose up -d --build

exit

