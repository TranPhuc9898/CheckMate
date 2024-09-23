import { colors, spacing, fontSize, borderRadius } from "@src/libs/theme";
import { Box, Card, Icon, Text } from "components";
import { getFontFamilyByLocale } from "libs/helper";
import { Dimensions, TouchableOpacity } from "react-native";

interface IConfig {
  sceneContainerStyle?: any;
  screenOptions?: any;
}

export const configTopTab: IConfig = {
  sceneContainerStyle: {
    backgroundColor: "transparent",
  },
  screenOptions: {
    // tắt swipe
    swipeEnabled: false, // or false
    lazy: true,
    tabBarAllowFontScaling: false,
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.primary,
    tabBarIndicatorStyle: {
      backgroundColor: colors.primary,
      height: "100%",
      borderRadius: spacing.l,
      borderWidth: 5,
      borderColor: colors.white,
    },
    tabBarStyle: {
      // height: TAB_HEIGHT,
      borderRadius: spacing.l,
      marginHorizontal: 7,
    },
    tabBarItemStyle: {
      // height: TAB_HEIGHT,
    },
    tabBarLabelStyle: {
      fontSize: fontSize.m,
      fontWeight: "bold",
      fontFamily: getFontFamilyByLocale().bold,
    },
    tabBarContentContainerStyle: {
      // height: TAB_HEIGHT,
      // justifyContent: 'center',
      // alignContent: 'center',
    },
  },
};
export const configBRewardTab: IConfig = {
  sceneContainerStyle: {
    backgroundColor: "transparent",
  },
  screenOptions: {
    lazy: true,
    tabBarAllowFontScaling: false,
    tabBarActiveTintColor: colors.white,
    tabBarInactiveTintColor: colors.primary,
    tabBarIndicatorContainerStyle: {
      backgroundColor: colors.primary3,
      borderRadius: borderRadius.s,
    },
    tabBarIndicatorStyle: {
      backgroundColor: colors.primary,
      height: "100%",
      borderRadius: borderRadius.s,
      borderWidth: spacing.s,
      borderColor: colors.primary3,
    },
    tabBarStyle: {
      borderRadius: borderRadius.s,
      marginHorizontal: spacing.l,
    },
    tabBarLabelStyle: {
      fontSize: fontSize.m,
      fontWeight: "bold",
      fontFamily: getFontFamilyByLocale().bold,
    },
  },
};

export const configFinanceTab: IConfig = {
  sceneContainerStyle: {
    backgroundColor: "transparent",
  },
  screenOptions: {
    lazy: true,
    tabBarAllowFontScaling: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.white,
    tabBarIndicatorContainerStyle: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.s,
    },
    tabBarIndicatorStyle: {
      backgroundColor: colors.white,
      height: "100%",
      borderRadius: borderRadius.s,
      borderWidth: spacing.s,
      borderColor: colors.primary,
    },
    tabBarStyle: {
      borderRadius: borderRadius.s,
      marginHorizontal: spacing.l,
    },
    tabBarLabelStyle: {
      fontSize: fontSize.m,
      fontWeight: "bold",
      fontFamily: getFontFamilyByLocale().bold,
    },
  },
};

export const toastConfig = {
  /**
   * @description Custom toast
   * @param district
   * @returns
   */
  tomatoToast: ({ props }) => (
    <TouchableOpacity onPress={props?.onPress}>
      <Card>
        <Box
          row
          alignCenter
        >
          <Box
            alignCenter
            style={{
              width: 50,
            }}
          >
            <Icon
              name="notification"
              color="primary"
              size="xl"
            />
          </Box>
          <Box
            style={{
              width: Dimensions.get("window").width - 110,
            }}
          >
            <Text
              numberOfLines={1}
              color="primary"
              bold
            >
              {props?.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                paddingTop: spacing.s,
              }}
            >
              {props?.content}
            </Text>
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  ),
};
