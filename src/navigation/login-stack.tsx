import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Config from "react-native-config";
import { loginStack } from "./router";
import { LocalizationContext } from "@src/libs/context";
import { colors } from "@src/libs/theme";
import HeaderBackButton from "@src/components/header-back-button";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { checkAnimationDisable, getFontFamilyByLocale } from "libs/helper";

const Stack = createNativeStackNavigator();

const LoginStack: React.FunctionComponent = () => {
  const { isFirstOpenApp, chooseSighUpOrLogin, isoCode } = useSelector(
    (state: RootState) => state.app
  );

  const I18n = React.useContext(LocalizationContext);

  let firstScreen = "Login";
  // Chưa chọn country
  if (!isoCode) {
    firstScreen = "ChooseCountry";
  } else {
    // Mở app lần đầu tiên => Hiển trị trang Intro
    if (isFirstOpenApp) {
      firstScreen = "IntroApp";
    } else {
      if (!chooseSighUpOrLogin) {
        // Chọn đăng ký hay đăng nhập
        firstScreen = "Registration";
      }
    }
  }

  return (
    <Stack.Navigator
      initialRouteName={firstScreen}
      screenOptions={({ navigation, route }) => ({
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors.white,
          fontFamily: getFontFamilyByLocale().bold,
        },
        headerLeft: (props) => {
          // Kiểm tra có màn hình trước đó không
          if (props.canGoBack) {
            return <HeaderBackButton navigation={navigation} />;
          }
        },
        animationEnabled: !checkAnimationDisable(),
        animation: checkAnimationDisable() ? "none" : "default", // Enabled animation
      })}
    >
      {loginStack.map((screen, index) => (
        <Stack.Screen
          name={screen.name}
          options={{
            title: I18n.t(screen.title),
            ...screen.options,
          }}
          component={screen.component}
          key={`LoginStack_${index}`}
        />
      ))}
    </Stack.Navigator>
  );
};

export default LoginStack;
