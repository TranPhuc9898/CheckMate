import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocalizationContext } from "@src/libs/context";
import { colors } from "@src/libs/theme";
import React from "react";
import Config from "react-native-config";
import { homeStack } from "./router";

import HeaderBackButton from "@src/components/header-back-button";
import { getFontFamilyByLocale } from "libs/helper";

const isTestingMode = Boolean(Config.MODE === "testing");

const Stack = createNativeStackNavigator();

const HomeStack: React.FunctionComponent = () => {
  const I18n = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator
      // initialRouteName={routeName} // show page after login here Home

      screenOptions={({ navigation, route }) => ({
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors.white,
          fontFamily: getFontFamilyByLocale().bold,
        },
        headerLeft: (props) => {
          return <HeaderBackButton navigation={navigation} />;
        },
        animationEnabled: false,
        animation: isTestingMode ? "none" : "default", // Enabled animation
      })}
    >
      {homeStack.map((screen, index) => (
        <Stack.Screen
          options={{
            title: I18n.t(screen.title),
            ...screen.options,
            // animationEnabled: !Boolean(Config.MODE === 'testing'), // Enabled animation
            // headerTitleStyle: {fontFamily: 'Montserrat-Bold', fontWeight: '600', marginLeft: isIOS ? 15: 0}
            // headerTransparent: true,
          }}
          testID={"tab" + screen.name}
          name={screen.name}
          component={screen.component}
          key={`HomeStack_${index}`}
          // options={{ headerShown: false }}
          // screenOptions={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
