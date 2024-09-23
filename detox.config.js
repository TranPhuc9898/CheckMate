module.exports = {
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "skipLegacyWorkersInjection": true,
  specs:
    process.env.DETOX_EXPOSE_GLOBALS === "0" ? "e2eExplicitRequire" : "e2e",
  behavior: {
    init: {
      exposeGlobals: process.env.DETOX_EXPOSE_GLOBALS === "0" ? false : true,
    },
  },
  "apps": {
    "ios.sim.debug": {
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=dev.env && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme btaskeePartner -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "ios.sim.ci": {
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=ci.env && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme bTaskeePartner-ci -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "ios.sim.release": {
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=dev.env && export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme btaskeePartner -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "android.emu.debug": {
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "export ENVFILE=dev.env && pushd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
    "android.emu.ci": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "export ENVFILE=ci.env && pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
    "android.emu.release": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "export ENVFILE=dev.env && pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 13",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "emulator-5554",
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=dev.env && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme btaskeePartner -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "ios.sim.ci": {
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=ci.env && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme bTaskeePartner-ci -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "ios.sim.release": {
      binaryPath:
        "ios/build/Build/Products/Release-iphonesimulator/btaskeePartner.app",
      build:
        "export ENVFILE=dev.env && export RCT_NO_LAUNCH_PACKAGER=true && xcodebuild -workspace ios/btaskeePartner.xcworkspace -scheme btaskeePartner -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -UseModernBuildSystem=YES -arch x86_64",
      type: "ios.simulator",
      name: "iPhone 13",
    },
    "ios.none": {
      type: "ios.none",
      session: {
        server: "ws://localhost:8099",
        sessionId: "com.wix.demo.react.native",
      },
    },
    "android.emu.debug": {
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "export ENVFILE=dev.env && pushd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
    "android.emu.ci": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "export ENVFILE=ci.env && pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
    "android.emu.release": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "export ENVFILE=dev.env && pushd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && popd",
      type: "android.attached",
      name: "emulator-5554",
    },
  },
};
