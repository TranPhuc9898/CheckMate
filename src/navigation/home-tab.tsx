import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Badge, Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { colors, spacing } from "@src/libs/theme";
import AccountScreen from "@src/screens/tab-account/account";
// Component
import BenefitScreen from "@src/screens/tab-benefit";
import TaskTab from "@src/screens/tab-home";
import Notification from "screens/tab-notification";
import { getFontFamilyByLocale } from "libs/helper";
import { RootState } from "redux/slice";

const Tab = createBottomTabNavigator();
const SIZE_ICON = 36;
const HEIGHT_TAB = 86;

const BottomTab = ({ navigation, route }) => {
  const [isOpenApp, setOpenApp] = useState(true);
  const I18n = React.useContext(LocalizationContext);
  const insets = useSafeAreaInsets(); // iphone X above

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        I18n.t("DIALOG.TITLE_INFORMATION"),
        I18n.t("DIALOG.ARE_YOU_SURE_TO_GO_BACK"),
        [
          {
            text: I18n.t("DIALOG.BUTTON_CANCEL"),
            onPress: () => null,
            style: "cancel",
          },
          {
            text: I18n.t("DIALOG.BUTTON_ACCEPT"),
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Redux
  const { isReadListChat } = useSelector((state: RootState) => state.app);
  const { isReadNotification } = useSelector(
    (state: RootState) => state.notification
  );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        tabBarAllowFontScaling: false,
        tabBarStyle: {
          borderTopLeftRadius: spacing.l,
          borderTopRightRadius: spacing.l,
          height: HEIGHT_TAB + insets.bottom,
        },
        tabBarLabelStyle: {
          marginBottom: spacing.l,
          fontSize: 12,
          fontFamily: getFontFamilyByLocale().normal,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TabHome"
        component={TaskTab}
        options={{
          tabBarTestID: "TabHome",
          tabBarLabel: ({ focused }) => (
            <Text
              color="primary"
              style={[
                styles.defaultLabel,
                {
                  fontFamily: focused
                    ? getFontFamilyByLocale().bold
                    : getFontFamilyByLocale().normal,
                },
              ]}
            >
              {I18n.t("HOME.TAB_HOME")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "homeFill" : "home"}
              height={SIZE_ICON}
              width={SIZE_ICON}
              color="primary"
            />
          ),
        }}
      />
      <Tab.Screen
        name="TabNotification"
        component={Notification}
        options={{
          tabBarTestID: "TabNotification",
          tabBarLabel: ({ focused }) => (
            <Text
              color="primary"
              style={[
                styles.defaultLabel,
                {
                  fontFamily: focused
                    ? getFontFamilyByLocale().bold
                    : getFontFamilyByLocale().normal,
                },
              ]}
            >
              {I18n.t("HOME.TAB_NOTIFICATION")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Box>
              <Icon
                name={focused ? "tabNotificationFill" : "tabNotification"}
                height={SIZE_ICON}
                width={SIZE_ICON}
                color="primary"
              />
              {isOpenApp || isReadListChat || isReadNotification ? <Badge badgeStyle={styles.badgeStyle} /> : null}
            </Box>
          ),
        }}
        listeners={{
          tabPress: async (e) => {
            // Prevent default action
            e.preventDefault();
            // Set data
            setOpenApp(false);
            // Navigate to TabNotification component
            navigation.navigate("TabNotification");
          },
        }}
      />
      <Tab.Screen
        name="TabBenefit"
        component={BenefitScreen}
        options={{
          tabBarTestID: "TabBenefit",
          tabBarLabel: ({ focused }) => (
            <Text
              color="primary"
              style={[
                styles.defaultLabel,
                {
                  fontFamily: focused
                    ? getFontFamilyByLocale().bold
                    : getFontFamilyByLocale().normal,
                },
              ]}
            >
              {I18n.t("HOME.TAB_BENEFIT")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "benefitFill" : "benefit"}
              height={SIZE_ICON}
              width={SIZE_ICON}
              color="primary"
            />
          ),
        }}
      />
      <Tab.Screen
        name="TabAccount"
        component={AccountScreen}
        options={{
          tabBarTestID: "TabAccount",
          tabBarLabel: ({ focused }) => (
            <Text
              color="primary"
              style={[
                styles.defaultLabel,
                {
                  fontFamily: focused
                    ? getFontFamilyByLocale().bold
                    : getFontFamilyByLocale().normal,
                },
              ]}
            >
              {I18n.t("HOME.TAB_ACCOUNT")}
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "accountFill" : "account"}
              height={SIZE_ICON}
              width={SIZE_ICON}
              color="primary"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  badgeStyle: {
    position: "absolute",
    top: -33,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  defaultLabel: {
    marginBottom: spacing.l,
    fontSize: 12,
  },
});
