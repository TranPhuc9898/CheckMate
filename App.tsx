import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "@src/libs/theme";
import SplashScreen from "@src/screens/splash-screen";
import CleverTap from "clevertap-react-native";
import Auth from "@src/navigation/authentication";
import { store, persistor } from "@src/redux/store";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useEffect } from "react";

CleverTap.deleteNotificationChannel("Task");
CleverTap.deleteNotificationChannel("Remind");

const createChannel = async () => {
  await notifee.createChannel({
    id: "Task_Partner",
    name: "Task Partner",
    description: "Task announcement partner",
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
    sound: "bells",
  });

  await notifee.createChannel({
    id: "Remind_Partner",
    name: "Remind Partner",
    description: "Task reminder partner",
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
    sound: "notify",
  });
};

const App: React.FunctionComponent = () => {
  // The notification channel importance can have any value from 1 to 5. A higher value means a more interruptive notification.
  // CleverTap.createNotificationChannel("Task", "Task", "Task from bTaskee", 4, true);
  // CleverTap.createNotificationChannel("Remind", "Remind", "Remind", 4, true);

  CleverTap.enableDeviceNetworkInfoReporting(true);
  CleverTap.registerForPush();
  CleverTap.setDebugLevel(__DEV__ ? 3 : 0);

  useEffect(() => {
    createChannel();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<SplashScreen />}
        persistor={persistor}
      >
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <Auth />
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
