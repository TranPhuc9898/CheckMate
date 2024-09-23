# Tasker application version 3

## Installation

App requires [Node.js](https://nodejs.org/) v13+ to run. (suggestion: v14.17.5)

Using npm:

```sh
npm reset
```

Using yarn:

```sh
yarn reset
```

## Run
##### On IOS

Configure Environment Variables with link: https://medium.com/armenotech/configure-environment-variables-with-react-native-config-for-ios-and-android-7079c0842d8b

```sh
./run.sh ios
or open from Xcode with file ios/bTaskeePartner.xcworkspace
```

##### On Android

```sh
./run.sh android
```

## Start Server

##### Server Asker (start MongoDB and API testing).
Clone https://bitbucket.org/lanterns/unicorn-tasker/ branch staging
Start server
```sh
npm start
```

##### Server Golang (start API)
Clone https://gitlab.com/btaskee/go-booking-home-cleaning-service branch master
Start server
```sh
./run-service.sh
```

## Testing

##### IOS
Build app
```sh
detox build ios.sim.debug
```
Run test
```sh
detox test -c ios.sim.debug
```
Run again
```sh
detox test -c ios.sim.debug --reuse
```
##### Android
Build app
```sh
detox build android.emu.debug
```
Run test
```sh
detox test -c android.emu.debug
```
Run again
```sh
detox -c android.emu.debug --reuse
```

#### Run all test IOS
```sh
./run-test-ios.sh
```
#### Run all test Android
```sh
./run-test-android.sh
```

## Troubleshooting
When installing or runing app, you may encounter the following problems:
<details>
  <summary>Not connected with server</summary>
  Edit file `dev.env` with key
- SERVER_API_IP=`[my ip]`
- WEB_SOCKET_ENPOINT=`[my ip]`


See my Ip run
```sh
ifconfig
```
And get my IP with key `en0` from list.
</details>

# CheckMate
