#!/bin/bash
CONTAINER=`docker build -f Dockerfile.dev . -q`
docker run -v ${PWD}:/app -p 3000:3000 $CONTAINER
