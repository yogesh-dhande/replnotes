#!/bin/bash

# echo "Pulling"
# git pull

echo "Building application"
docker-compose -f replnotes/docker-compose.prod.yaml up