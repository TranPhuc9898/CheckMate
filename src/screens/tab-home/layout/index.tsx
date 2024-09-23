import React, { useEffect } from "react";
import CarAdvertisingScreen from "screens/car-advertising/layout";
import TaskLaundryTab from "screens/tab-laundry/layout";
import { InteractionManager } from "react-native";

// Component
import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
// Navigation
import TaskTab from "@src/navigation/task-tab";
import {
  USER_STATUS_ACTIVE,
  USER_STATUS_IN_PROBATION,
  USER_STATUS_LOCKED,
  USER_STATUS_UNVERIFIED,
} from "libs/constants";
import { getFCMToken, subscribeNotificationAction } from "libs/helper";

import ProcedureActiveAccount from "screens/procedure-active-account";
import WebSocketsTask from "web-sockets/task";
import Net from "./net-info";

// Những status của user có thể xem được trang "New task" và "My task"
// Vẫn hỗ trợ user có status LOCKED xem được trang "My task" để user có thể làm những công việc đã nhận
// Nhưng không hỗ trợ user có status LOCKED nhận việc
const statusOfUserCanSeeTask = [
  USER_STATUS_ACTIVE,
  USER_STATUS_LOCKED,
  USER_STATUS_IN_PROBATION,
];

interface TabHomeProps {
  user: any;
  navigation: any;
  initData: () => void;
}

const TabHome = ({ user, initData, navigation, ...others }: TabHomeProps) => {
  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      initData();
      getFCMToken();
      subscribeNotificationAction();
    });
    return () => {
      interaction.cancel();
    };
  }, []);

  const _renderContent = () => {
    const isCanSeeTask = statusOfUserCanSeeTask.indexOf(user?.status) >= 0;
    // User dịch vụ quảng cáo trên xe và đã active
    if (isCanSeeTask && user?.isCarAdvertising) {
      return <CarAdvertisingScreen />;
    }
    // User active và đăng ký dịch vụ Giặt ủi
    if (isCanSeeTask && user?.isLaundryPartner) {
      return <TaskLaundryTab {...others} />;
    }
    // User đã hoàn thành training input, có thể nhận việc
    if (isCanSeeTask) {
      return (
        <TaskTab
          {...others}
          navigation={navigation}
        />
      );
    }
    //  User đã nhập OTP xong nhưng chưa làm bài test training input
    if (user?.status === USER_STATUS_UNVERIFIED) {
      return <ProcedureActiveAccount />;
    }
    return null;
  };
  const I18n = React.useContext(LocalizationContext);

  return (
    <Container headerShow={false}>
      {/* <Campaign /> */}
      <HeaderHome
        title={I18n.t("HOME.BTASKEE")}
        navigation={navigation}
        isShowWeather={true}
        fromHomePage={true}
      />
      {_renderContent()}
      <WebSocketsTask />
      <Net />
    </Container>
  );
};

export default TabHome;
