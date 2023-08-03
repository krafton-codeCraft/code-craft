#!/bin/bash

WORKDIRECTORY=/home/ubuntu/code-craft/

# 기존 도커 삭제
if [ "$(docker ps -q -f name=boot_app)" ]; then
    # 컨테이너가 실행 중이면 중지(stop)하고 삭제(remove)
    docker stop boot_app
    docker rm boot_app
fi

# 도커 이미지 삭제

# 도커 기동
cd ${WORKDIRECTORY}
./gradlew clean build
docker build -t boot_app ${WORKDIRECTORY}

docker-compose --compatibility up -d