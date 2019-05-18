#!/usr/bin/env bash

docker run -d -p 8080:8080 -p 65520:65520   \
       -v ${PWD}/contracts/:/app/contracts  \
       4c0n/remix-ide
