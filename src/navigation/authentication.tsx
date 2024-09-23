import React, { useEffect, useMemo, useRef } from "react";
import { AppState, StatusBar } from "react-native";
import RNRestart from "react-native-restart";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import notifee from "@notifee/react-native";
import crashlytics from "@react-native-firebase/crashlytics";
import { NavigationContainer } from "@react-navigation/native";
import moment from "moment";
import CheckVersionApp from "screens/check-version-app";
import ChooseServiceRegion from "screens/choose-service-region";
import SplashScreen from "screens/splash-screen";
import WebSocketsNotify from "web-sockets/notification/layout";

import CustomAlert from "@components/alert";
import { Alert, Loading } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { checkVersionApp, refreshDataHome, setLocale } from "@src/redux/slice/app-slice";
import ModalAlert from "components/modal-alert";
import { isReadyRef, navigationRef } from "libs/helper";
import I18n from "libs/localization";
import { RootState } from "redux/slice";
import { store } from "redux/store";

import { toastConfig } from "./config";
import HomeStack from "./home-stack";
import LoginStack from "./login-stack";

const TIME_REFRESH_DATA = 5; // Minutes
const TIME_REFRESH_APP = 10; // Minutes

const Auth: React.FunctionComponent = (props) => {
  const appState = useRef(AppState.currentState);

  /**
    @description
    Kiểm tra trạng thái của app đang ở background chuyển qua active thì:
      - Refresh data nếu trên 5 phút
      - Reset app nếu trên 10 phút
  */
  useEffect(() => {
    let lastTimeAppActive = moment();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // Kiểm tra trạng thái của app, nếu đang ở background chuyển qua active thì refresh data (Trên 5 phút)
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        Boolean(moment().diff(lastTimeAppActive, "minutes") > TIME_REFRESH_DATA)
      ) {
        store.dispatch(refreshDataHome());
      }
      // Kiểm tra trạng thái của app, nếu đang ở background chuyển qua active thì reset app (Trên 10 phút)
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        Boolean(moment().diff(lastTimeAppActive, "minutes") > TIME_REFRESH_APP)
      ) {
        RNRestart.Restart();
      }
      // Set lại trạng thái của app
      appState.current = nextAppState;
      // Nếu app chuyển qua trạng thái inactive hoặc background thì lưu thời gian
      if (appState.current === "inactive" && nextAppState.match(/inactive|background/)) {
        lastTimeAppActive = moment();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // Call API check version
    store.dispatch(checkVersionApp());
    // Set badge of icon app
    notifee.setBadgeCount(0);
  }, []);
  const { user, locale, newVersionInfo, isLoadingWaitingPersist } = useSelector((state: RootState) => state.app);

  // config i18n
  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => I18n.t(scope, { locale, ...options }),
      locale,
      setLocale: (locale) => {
        setLocale(locale);
        // moment.locale(locale);
      },
    }),
    [locale]
  );

  let StackApp: any = null;

  /**
   * Hiển thị Splash Screen mỗi khi mở app
   */
  if (isLoadingWaitingPersist) {
    return <SplashScreen />;
  }

  // Kiểm tra có user chưa
  if (user) {
    // Lưu vào redux, lấy nó ra sử dụng
    // Đã đăng nhập vào Home, còn lại vào Login
    StackApp = <HomeStack />;
  } else {
    StackApp = <LoginStack />;
  }
  //Kiểm tra version trong app
  /**
   * Có phiên bản mới hoặc đang bảo trì
   */
  if (newVersionInfo) {
    StackApp = <CheckVersionApp />;
  }

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {/* config status bar for Android */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        animated
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
        onStateChange={() => {
          // Log for craslytic
          const currentRouteName = navigationRef && navigationRef?.current?.getCurrentRoute()?.name;
          // Send log
          crashlytics().log("Screen: " + currentRouteName);
        }}
      >
        {StackApp}
      </NavigationContainer>

      {/* Loading app */}
      <Loading />
      {/* End loading app */}

      {/* Toast */}
      <Toast config={toastConfig} />
      {/* End toast */}

      {/* Alert app */}
      <CustomAlert ref={(ref) => Alert.setAlert(ref)} />
      {/* End alert app */}

      {/* Socket notification */}
      {user ? <WebSocketsNotify /> : null}
      {/* End socket notification */}

      {/* Modal alert */}
      <ModalAlert />
      {/* End modal alert */}

      {/* Request update Workplace and Services */}
      {user?.isNeedUpdateWorkingPlacesAndServices ? <ChooseServiceRegion /> : null}
    </LocalizationContext.Provider>
  );
};

export default Auth;
