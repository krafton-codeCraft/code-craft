RESOURCES_PATH="./src/main/resources"
TARGET_PORT=8080

# copy
# cp -f  "${RESOURCES_PATH}/static/dist/index.html" "${RESOURCES_PATH}/templates/"


process_id=$(lsof -ti:8080)

if [ -n "$process_id" ]; then
  kill $process_id
fi

./gradlew clean build
nohup java -jar -Dserver.port=${TARGET_PORT} /home/ubuntu/code-craft/build/libs/* > /home/ubuntu/nohup.out 2>&1 &