import { useEffect, useRef, useState } from "react";
import { AppState, Linking, StyleSheet } from "react-native";
import { checkNotifications, RESULTS } from "react-native-permissions";
import { useSelector } from "react-redux";

import { Box } from "components";
import { LINK_SUPPORT_ZALO } from "libs/constants";
import { openUrl } from "libs/helper";
import { RootState } from "redux/slice";

import NotificationChatApp from "../notification-chat-app/index";
import NotificationPermission from "../notification-permission";

const HeadNotificationChatApp = () => {
  // Hook
  const appState = useRef(AppState.currentState);
  const [isNotificationDisabled, setIsNotificationDisabled] = useState(false);
  const { settingSystem } = useSelector((state: RootState) => state?.app);
  const _onPress = () => {
    openUrl(settingSystem?.supports?.zalo || LINK_SUPPORT_ZALO);
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
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
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
        iconName="zalo"
      />
    </Box>
  );
};

export default HeadNotificationChatApp;

const styles = StyleSheet.create({});
