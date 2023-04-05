#!/bin/bash
ssh $USER@$DIGITALOCEAN_DROPLET_IP
mkdir -p web-bid
cd web-bid

if [ ! -d config ] 
then
  scp -r ./config $USER@$DIGITALOCEAN_DROPLET_IP:./config
fi

dockerCompose="./docker-compose.yml"
if [ -e "$dockerCompose" ] 
then 
  rm "$dockerCompose"
  scp ./docker-compose.yml $USER@$DIGITALOCEAN_DROPLET_IP:./docker-compose.yml
fi

[ ! -e .env ] && scp ./.env $USER@$DIGITALOCEAN_DROPLET_IP:./.env

docker compose up -d --build

exit

