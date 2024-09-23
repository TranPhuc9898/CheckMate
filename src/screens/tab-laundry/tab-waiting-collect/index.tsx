/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 09:30:58
 * @modify date 2022-10-15 09:30:58
 * @desc [My Task]
 */
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Box, Image, TaskItem, Text } from "components";
import { LocalizationContext } from "libs/context";
import moment from "moment";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import SkeletonMyTasks from "screens/tab-home-my-tasks/layout/skeleton-my-tasks";
import {
  onGetMyTasks,
  onUpdateMyTasksSocket,
} from "screens/tab-home-my-tasks/slice";
import styles from "./styles";
import DateOfWeek from "./pickerDate";
import { statusTask } from "libs/config";
import { groupTaskByTime } from "libs/helper";

const TaskWaitingCollect = ({ navigation }) => {
  const { listDataTask } = useSelector((state: RootState) => state.myTasks);
  const { myTasksSocket } = useSelector(
    (state: RootState) => state.tasksSocket
  );
  const I18n = React.useContext(LocalizationContext);

  const [isShowLoading, setShowLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFilter, setDateFilter] = useState(moment());
  const [tasksOfDate, setTasksOfDate] = useState(
    _.filter(
      listDataTask,
      (item) => moment(item.date).isSame(moment(), "day") && !item?.isReceived
    )
  );

  // Init data my task
  const initData = async () => {
    await store.dispatch(onGetMyTasks(setShowLoading));
  };

  // Auto call api after 5 minutes
  // useEffect(() => {
  //   setInterval(() => {
  //     initData();
  //   }, 300000);
  // }, []);

  useEffect(() => {
    // Init data when focus
    const unsubscribe = navigation.addListener("focus", () => {
      initData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTasksOfDate(
      _.filter(
        listDataTask,
        (item) =>
          moment(item.date).isSame(dateFilter, "day") && !item?.isReceived
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
  if (isShowLoading && _.isEmpty(listDataTask)) return <SkeletonMyTasks />;

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
            style={[styles.txtTitle,{color: item?.color}]}
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
              style={Boolean(dataTask?.status === statusTask.done) ? styles.wrapTaskDone : null}
            />
          ))}
        </Box>
      </Box>
      
    )
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
            onChange={setDateFilter}
            isWaitingCollect={true}
          />
        }
        ListHeaderComponentStyle={styles.headerStyle}
        ListEmptyComponent={renderTasksEmpty}
      />
    </>
  );
};

export default TaskWaitingCollect;
