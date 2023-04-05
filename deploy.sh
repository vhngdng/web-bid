#!/bin/bash
mkdir -p web-bid
cd web-bid

if [ ! -d config ] 
then
  scp -r ./config dung@${{vars.DIGITALOCEAN_DROPLET_IP}}:./config
fi

if [ -e "$dockerCompose" ] 
then 
  rm "$dockerCompose"
  scp ./docker-compose.yml dung@${{vars.DIGITALOCEAN_DROPLET_IP}}:./docker-compose.yml
fi

[ ! -e .env ] && scp ./.env dung@${{vars.DIGITALOCEAN_DROPLET_IP}}:./.env

docker compose up -d --build

