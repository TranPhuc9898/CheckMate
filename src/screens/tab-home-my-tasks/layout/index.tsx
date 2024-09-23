/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 09:30:58
 * @modify date 2022-10-15 09:30:58
 * @desc [My Task]
 */
import React, { useEffect, useState } from "react";
import { FlatList, InteractionManager, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import {
  onGetMyTasks,
  onUpdateMyTasksSocket,
  removeCacheTaskConfirmed,
} from "../slice";
import SkeletonMyTasks from "./skeleton-my-tasks";
import _ from "lodash";
import moment from "moment";

import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";
import { Box, Image, TaskItem, Text } from "components";
import { statusTask } from "libs/config";
import { LIMIT_DATE } from "libs/constants";
import { LocalizationContext } from "libs/context";
import { checkTaskDateWithSelectDate, groupTaskByTime } from "libs/helper";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import { useFocusEffect } from "@react-navigation/native";
import { useAnimation } from "hooks/animation";

import DateOfWeek from "./pickerDate";
import styles from "./styles";

const MyTasksScreen = ({ route }) => {
  const { listDataTask } = useSelector((state: RootState) => state.myTasks);
  const { myTasksSocket } = useSelector(
    (state: RootState) => state.tasksSocket
  );
  const I18n = React.useContext(LocalizationContext);

  const [isShowLoading, setShowLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState(moment());
  const [defaultIndexDateFilter, setDefaultIndexDateFilter] = useState<any>();
  const [tasksOfDate, setTasksOfDate] = useState(
    _.filter(listDataTask, (item) => {
      return moment(item.date).isSame(moment(), "day");
    })
  );

  // Init data my task
  const initData = async () => {
    await store.dispatch(onGetMyTasks(setShowLoading));
    // if (!result.isSuccess) {
    //   return setError(result?.error);
    // }
    // return setError(false);
  };

  useEffect(() => {
    trackingCleverTapScreenView("My Task");
    removeCacheTaskConfirmed();
  }, []);

  useEffect(() => {
    const defaultDateFilter = route?.params?.dateOfFilter;
    if (defaultDateFilter) {
      setDateFilter(defaultDateFilter);
      const today = moment().startOf("day");
      const defaultDay = moment(defaultDateFilter).endOf("day");
      const defaultIndex = moment(defaultDay).diff(moment(today), "days");
      // Khi thời gian nhận việc sau LIMIT_DATE thì default chọn nút xem thêm
      setDefaultIndexDateFilter(
        defaultIndex > LIMIT_DATE ? LIMIT_DATE : defaultIndex
      );
    }
  }, [route?.params?.dateOfFilter]);

  // Auto call api after 5 minutes
  // useEffect(() => {
  //   setInterval(() => {
  //     initData();
  //   }, 300000);
  // }, []);

  // useEffect(() => {
  //   // Init data when focus
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     initData();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        // Reset get data when destroy
        initData();
      });

      return () => interaction.cancel();
    }, [])
  );

  useEffect(() => {
    setTasksOfDate(
      _.filter(listDataTask, (item) =>
        checkTaskDateWithSelectDate(dateFilter, item.date)
      )
    );
  }, [dateFilter, listDataTask]);

  // Nhận socket
  useEffect(() => {
    // Cập nhật task confirmed từ socket
    store.dispatch(onUpdateMyTasksSocket(myTasksSocket, listDataTask));
  }, [myTasksSocket]);

  // Full to refresh data task confirm
  const onRefresh = React.useCallback(() => {
    // Show refreshing
    setRefreshing(true);

    // Init data task confirm
    initData();

    // Hide refreshing
    setRefreshing(false);
  }, []);

  // Hiển thị skeleton khi không có công việc nào trong danh sách
  // if (isShowLoading && _.isEmpty(listDataTask)) return <SkeletonMyTasks />;

  // Show when list task confirm empty
  const renderTasksEmpty = () => {
    return (
      <Box center>
        <Text>{I18n.t("TASK_DETAIL.MY_TASK_EMPTY")}</Text>
      </Box>
    );
  };

  const _renderItem = ({ item }) => {
    if (!item?.group) {
      return null;
    }
    return (
      <Box>
        <Box style={styles.wrapBackground}>
          <Image
            source={item?.backgroundImage}
            style={styles.backgroundImage}
          />
        </Box>
        <Box>
          <Text
            variant="h3"
            style={[styles.txtTitle, { color: item?.color }]}
          >
            {I18n.t("TASK_DETAIL." + item?.group)}
          </Text>
        </Box>
        <Box style={styles.wrapTaskItem}>
          {item?.data.map((dataTask, index) => (
            <TaskItem
              testID="confirmTask"
              item={dataTask}
              key={"task_" + index}
              disabled={Boolean(dataTask?.status === statusTask.done)}
              style={
                Boolean(dataTask?.status === statusTask.done)
                  ? styles.wrapTaskDone
                  : null
              }
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <FlatList
        data={groupTaskByTime(tasksOfDate)}
        renderItem={_renderItem}
        contentContainerStyle={styles.containerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <DateOfWeek
            onChange={(date) => {
              setDateFilter(date);
              useAnimation("linear");
            }}
            defaultIndexDateFilter={defaultIndexDateFilter}
          />
        }
        ListHeaderComponentStyle={styles.headerStyle}
        ListEmptyComponent={renderTasksEmpty}
      />
    </>
  );
};

export default MyTasksScreen;
