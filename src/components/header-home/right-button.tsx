/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header home
 */
import React from "react";
import { useNavigationState } from "@react-navigation/native";
import _ from "lodash";

import ClearNotificationButton from "./clear-notification-button";
// STYLES
import IconMonthlyReward from "./icon-monthly-reward";
// import IconNotification from "./icon-notification";

const NOTIFICATION_SYSTEM = "TabNotificationSystem";

interface IHeaderHome {
  fromHomePage?: any;
}

const HeaderHome: React.FC<IHeaderHome> = ({ fromHomePage }) => {
  const state = useNavigationState((state) => _.get(state, `routes[${state.index}].state`, {}));
  const tabName = _.get(state, `routeNames[${state.index}]`, "");

  // Hiển thị nút đã đọc tất cả thông báo khi đang ở tab TabNotificationSystem
  if (tabName === NOTIFICATION_SYSTEM) {
    return <ClearNotificationButton />;
  }

  return <IconMonthlyReward fromHomePage={fromHomePage} />;
};

export default HeaderHome;
