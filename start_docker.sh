#!/bin/sh

NETWORK_NAME=web3-api-network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then
     docker network create ${NETWORK_NAME} ;
fi

docker-compose up -d
docker exec -it web3api yarn install
docker exec -it web3api yarn build
docker exec -it web3api yarn start
