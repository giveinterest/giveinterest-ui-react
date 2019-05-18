#!/bin/bash
CONTAINER=`docker build . -q`
docker run -p 3000:3000 $CONTAINER