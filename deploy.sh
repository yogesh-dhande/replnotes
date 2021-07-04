#!/bin/bash

# echo "Pulling"
# git pull

echo "Building application"
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose -f docker-compose.prod.yaml up --build