import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Box } from "components";
import { colors, spacing } from "libs/theme";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  InteractionManager,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import {
  getListNotificationTask,
  getListNotificationSystem,
} from "screens/tab-notification/slice";

import NotificationSystem from "./notification-system";
import NotificationTask from "./notification-task";

import _ from "lodash";
import { setLoading } from "redux/slice/app-slice";

const Notification = () => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const { listNotificationTask, listNotificationSystem } = useSelector(
    (state: RootState) => state.notification
  );
  //Init Data Thông báo mới
  const initDataNewsNotification = async () => {
    _.isEmpty(listNotificationTask) &&
      _.isEmpty(listNotificationSystem) &&
      (await store.dispatch(setLoading(true)));
    await store.dispatch(getListNotificationSystem());
    await store.dispatch(setLoading(false));
  };

  // Init data thông báo công việc
  const initDataListNotification = async () => {
    _.isEmpty(listNotificationTask) && (await store.dispatch(setLoading(true)));
    await store.dispatch(getListNotificationTask());
    await store.dispatch(setLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        // Reset get data when destroy
        initDataNewsNotification() && initDataListNotification();
      });
      return () => interaction.cancel();
    }, [])
  );

  // Full to refresh data
  const onRefresh = useCallback(async () => {
    // Show refreshing
    setRefreshing(true);
    // Init data task confirm
    isFocused &&
      initDataNewsNotification() &&
      (await initDataListNotification());
    // Hide refreshing
    setRefreshing(false);
    return (
      <ActivityIndicator
        color={colors.primary}
        size="small"
        style={{ marginTop: spacing.xl }}
      />
    );
  }, [isFocused]);

  return (
    <Box
      flex
      style={{ paddingTop: spacing.l }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Lasted New Carousel */}
        <NotificationSystem />
        {/* Task Notification */}
        <NotificationTask />
      </ScrollView>
    </Box>
  );
};
export default Notification;
