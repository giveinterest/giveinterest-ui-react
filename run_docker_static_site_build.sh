#!/bin/bash
CONTAINER=`docker build -f Dockerfile.run_static . -q`
docker run -p 8081:80 $CONTAINER
