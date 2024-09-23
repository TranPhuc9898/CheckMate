BUILD_DIR=$(cd "$(dirname "$0")"; pwd)
# ENV_FILE="prod.env"

# Run setup.sh on fresh machine
printf "\n\n\x1b[33m========== Running clear cache, remove: node modules, cocoapods, reinstall: node modules, cocoapods =========== \x1b[0m \n\n"
# cd $BUILD_DIR && yarn reset

case "$1" in
  'ios')
    cd $BUILD_DIR/ios/ && rm -rf build
    cd $BUILD_DIR/ios && xcodebuild -alltargets clean && echo "prod.env" > /tmp/envfile
  ;;
  'android')
    cd $BUILD_DIR && export ENVFILE=prod.env && cd android && ./gradlew clean
  ;;
esac
