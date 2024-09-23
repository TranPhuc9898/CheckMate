#!/bin/bash
BUILD_DIR=$(cd "$(dirname "$0")"; pwd)

#Workflow:
#1. IMPORTANT! Build current production app with staging key (i.e ./run.sh android staging) first
#2. Merge PRs that need to push to current version app, run test on CI to verify
#3. Use production env to build and push app to staging (i.e ./code-push.sh staging android 1.1.2)
#3. Open staging key app in step 1 to get the new code and test again
#5. Promote Staging to production (i.e ./code-push.sh prod android)

case "$1" in
  'update')
    cd ~ && npm install -g code-push-cli@latest
    ;;
  'add')
    #cd $BUILD_DIR && code-push app add bTaskeePartner
    ENVFILE=prod.env code-push app add bTaskeePartner-iOS ios react-native
    ENVFILE=prod.env code-push app add bTaskeePartner-Android android react-native
    ;;
  'staging')
    yarn clean
    case "$2" in
      'android')
        #cd android
        #ENVFILE=prod.env ./gradlew clean
        #cd ..
        ENVFILE=prod.env code-push release-react bTaskeePartner-Android android --targetBinaryVersion "$3"
        ;;
      'ios')
        cd $BUILD_DIR
        ENVFILE=prod.env code-push release-react bTaskeePartner-iOS ios --targetBinaryVersion "$3"
    esac
    ;;
  'prod')
    case "$2" in
      'android')
        code-push promote bTaskeePartner-Android  Staging Production
        ;;
      'ios')
        code-push promote bTaskeePartner-iOS  Staging Production
    esac
    ;;
  'ls')
    case "$2" in
      'android')
        code-push deployment ls bTaskeePartner-Android -k
        ;;
      'ios')
        code-push deployment ls bTaskeePartner-iOS -k
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
