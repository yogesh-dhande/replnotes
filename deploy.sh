#!/bin/bash

# echo "Pulling"
# git pull

echo "Building application"

docker-compose --env-file .env.staging.local up 
docker run --rm -d \
    --env-file .env.staging.local
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose -f docker-compose.yaml up


docker run --rm -d \
    --env-file .env.production.local
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose -f docker-compose.prod.yaml up --build