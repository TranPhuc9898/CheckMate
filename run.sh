#!/bin/bash
BUILD_DIR=$(cd "$(dirname "$0")"; pwd)
SERVER_IP=`ifconfig en0 | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'`
OLD_SERVER_IP='SERVER_IP=\([0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\)'
OLD_SERVER_API_IP='^SERVER_API_IP=.*'
OLD_WEB_SOCKET_ENDPOINT='WEB_SOCKET_ENPOINT=.*'
OLD_WEB_SOCKET_ENDPOINT_ID='WEB_SOCKET_ENPOINT_ID=.*'

if [[ -z $2 ]] ;
then
  sed -i -e "s/$OLD_SERVER_IP/SERVER_IP=$SERVER_IP/" dev.env
  sed -i -e "s/$OLD_SERVER_API_IP/SERVER_API_IP=http:\/\/$SERVER_IP/" dev.env
  sed -i -e "s/$OLD_WEB_SOCKET_ENDPOINT/WEB_SOCKET_ENPOINT=ws:\/\/$SERVER_IP\:7777/" dev.env
  sed -i -e "s/$OLD_WEB_SOCKET_ENDPOINT_ID/WEB_SOCKET_ENPOINT=ws:\/\/$SERVER_IP\:8888/" dev.env
  rm -rf dev.env-e
fi

case "$1" in
  'dev')
    printf "\n\n\x1b[33m========== Running application with Dev mode =========== \x1b[0m \n\n"
    ENVFILE=dev.env npx react-native run-ios
    ;;
  'ios')
    if [[ -z $2 ]] ;
    then
      printf "\n\n\x1b[33m========== Running application with Debug mode =========== \x1b[0m \n\n"
      yarn run clean
      cd $BUILD_DIR
      ENVFILE=dev.env npx react-native run-ios
    else
      printf "\n\n\x1b[33m========== Running application with Release mode =========== \x1b[0m \n\n"
      yarn run clean
      cd $BUILD_DIR
      ENVFILE=prod.env npx react-native run-ios --scheme bTaskee-prod --configuration Release
    fi
    ;;
  'android')
    printf "\n\n\x1b[33m=============== Uninstall the old app ... ================== \x1b[0m \n\n"
    adb uninstall com.btaskee.partner

    if [[ -z $2 ]] ;
    then
      printf "\n\n\x1b[33m========== Cleaning gradlew =========== \x1b[0m \n\n"
      cd android
      ENVFILE=dev.env ./gradlew clean
      printf "\n\n\x1b[33m========== Running application with Debug mode =========== \x1b[0m \n\n"
      cd ..
      ENVFILE=dev.env npx react-native run-android
    else
      printf "\n\n\x1b[33m========== Cleaning gradlew =========== \x1b[0m \n\n"
      cd android
      ENVFILE=prod.env ./gradlew clean
      printf "\n\n\x1b[33m========== Running application with Release mode =========== \x1b[0m \n\n"
      cd ..
      ENVFILE=prod.env npx react-native run-android --variant=release
    fi
    ;;
  *)
    printf "\nTo run Debug on IOS:\n"
    printf "\n\t./run.sh ios\n"

    printf "\nTo run Release on IOS:\n"
    printf "\n\t./run.sh ios release\n"

    printf "\nTo run Debug on Android:\n"
    printf "\n\t./run.sh android\n"

    printf "\nTo run Release on Android:\n"
    printf "\n\t./run.sh android release\n"
  ;;
esac
