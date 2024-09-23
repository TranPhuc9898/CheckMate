import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
// Src
import { LocalizationContext } from "@src/libs/context";
import NotificationChat from "screens/tab-notification/notification-chat/layout";
import Notification from "screens/tab-notification/notification-system/layout/index";
import { configTopTab } from "./config";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Component
import { Badge, Box } from "components";

import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import _ from "lodash";

import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";

const Tab = createMaterialTopTabNavigator();

interface INotificationTab {
  badgeChat?: any;
}
const NotificationTab: React.FC<INotificationTab> = ({ badgeChat }) => {
  const I18n = React.useContext(LocalizationContext);

  const { isReadListChat } = useSelector((state: RootState) => state.app);
  const { isReadNotification } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    trackingCleverTapScreenView("Notification");
  }, []);

  return (
    <Tab.Navigator {...configTopTab}>
      <Tab.Screen
        name="TabNotificationChat"
        component={NotificationChat}
        options={{
          swipeEnabled: false,
          tabBarLabel: I18n.t("NOTIFICATION_CHAT.TAB_TITLE"),
          tabBarTestID: "TabNotificationChat",
          tabBarBadge: () => (
            <Box>
              {isReadListChat ? (
                <Badge containerStyle={styles.badgeStyle} />
              ) : null}
            </Box>
          ),
        }}
      />

      <Tab.Screen
        name="TabNotificationSystem"
        component={Notification}
        options={{
          swipeEnabled: false,
          tabBarLabel: I18n.t("NOTIFICATION_SYSTEM.TAB_TITLE"),
          tabBarTestID: "TabNotificationSystem",
          tabBarBadge: () => (
            <Box>
              {isReadNotification ? (
                <Badge containerStyle={styles.badgeStyle} />
              ) : null}
            </Box>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NotificationTab;
const styles = StyleSheet.create({
  badgeStyle: {
    marginRight: 2,
    marginTop: 2,
  },
});
