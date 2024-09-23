/**
 * @format
 */

import { AppRegistry, LogBox } from "react-native";
import CodePush from "react-native-code-push";
import { gestureHandlerRootHOC } from "react-native-gesture-handler"; // animation cho Alert

import App from "./App";
import { name as appName } from "./app.json";

// Code push config
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

const MyApp = CodePush(codePushOptions)(gestureHandlerRootHOC(App));

AppRegistry.registerComponent(appName, () => MyApp);

// Ẩn warning gọi API thất bại
LogBox.ignoreLogs([
  "Possible Unhandled Promise Rejection",
  "Non-serializable values were found in the navigation state",
]);
