import { LINK_SUPPORT_LINE_THAI } from "libs/constants";
import { openUrl } from "libs/helper";
import { Linking, StyleSheet, AppState } from "react-native";
import NotificationChatApp from "../notification-chat-app/index";
import { Box } from "components";
import NotificationPermission from "../notification-permission";
import { useEffect, useState, useRef } from "react";
import { checkNotifications, RESULTS } from "react-native-permissions";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const HeadNotificationChatApp = () => {
  // Hook
  const appState = useRef(AppState.currentState);
  const [isNotificationDisabled, setIsNotificationDisabled] = useState(false);
  const { settingSystem } = useSelector((state: RootState) => state?.app);

  const _onPress = () => {
    openUrl(settingSystem?.supports?.line || LINK_SUPPORT_LINE_THAI);
  };
  const onPressNotiPermission = () => {
    Linking.openSettings();
  };

  const checkPermissionNotification = () => {
    checkNotifications().then(({ status }) => {
      if (status !== RESULTS.GRANTED) {
        setIsNotificationDisabled(true);
      } else {
        setIsNotificationDisabled(false);
      }
    });
  };

  // Docs React Native version lasted
  useEffect(() => {
    checkPermissionNotification();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        checkPermissionNotification();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Box>
      <NotificationPermission
        onPress={onPressNotiPermission}
        disabled={isNotificationDisabled}
      />
      <NotificationChatApp
        onPress={_onPress}
        iconName="line"
      />
    </Box>
  );
};

export default HeadNotificationChatApp;

const styles = StyleSheet.create({});
