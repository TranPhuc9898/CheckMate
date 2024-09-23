#!/bin/bash
BUILD_DIR=$(cd "$(dirname "$0")"; pwd)

case "$1" in
  'update')
    cd ~ && npm install -g code-push-cli@latest
  ;;
  'add')
    #cd $BUILD_DIR && code-push app add bTaskee
    ENVFILE=dev.env code-push app add bTaskeePre-iOS ios react-native
    ENVFILE=dev.env code-push app add bTaskeePre-Android android react-native
  ;;
  'staging')
    yarn clean
    case "$2" in
      'android')
        cd android
        ENVFILE=dev.env ./gradlew clean
        cd ..
        ENVFILE=dev.env code-push release-react bTaskeePre-Android android --targetBinaryVersion "$3"
        ;;
      'ios')
        cd $BUILD_DIR
        ENVFILE=dev.env code-push release-react bTaskeePre-iOS ios --targetBinaryVersion "$3"
    esac
    ;;
  'prod')
    case "$2" in
      'android')
        code-push promote bTaskeePre-Android  Staging Production
        ;;
      'ios')
        code-push promote bTaskeePre-iOS  Staging Production
    esac
    ;;
  'ls')
    case "$2" in
      'android')
        code-push deployment ls bTaskeePre-Android -k
        ;;
      'ios')
        code-push deployment ls bTaskeePre-iOS -k
    esac
    ;;
  *)
    printf "\n See help \n"
    printf "\n Syntax go to staging \n ./code.push.sh [environment mode] [platform] [version]\n"
    printf "\n Syntax go to production \n ./code.push.sh [environment mode] [platform]\n"
    printf "\n Ex IOS: \n"
    printf "\n ./code.push.sh staging ios 1.0.0\n"
    printf "\n For production IOS \n"
    printf "\n ./code.push.sh prod ios\n"
esac
