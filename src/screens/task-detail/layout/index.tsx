import React, { useContext, useRef, useState } from "react";
import { InteractionManager, RefreshControl, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import { setTasksPosted } from "screens/tab-home-new-tasks/slice";

import { Alert, Box, Card, Container, Modal, Text } from "@src/components";
import { NETWORK_REQUEST_FAILED } from "@src/libs/helper/error-code-list";
import { trackingViewTask } from "@src/libs/tracking/track-clever-tap";
import ErrorScreen from "@src/screens/error";
import getTaskDetailAPI, { IParamGetTaskDetail } from "apis/tasks/get-task-detail";
import { statusTask } from "libs/config";
import { CACHE_TASK_CONFIRMED } from "libs/constants";
import { LocalizationContext } from "libs/context";
import { getUserIdGlobal, IRespond } from "libs/helper";
import { store } from "redux/store";

import ContentModalCancel from "./components/cancel/content-modal-cancel";
import ContentModalChooseReason from "./components/cancel/content-modal-choose-reason";
import ContentModalConfirmCancelTask from "./components/cancel/content-modal-confirm-cancel-task";
import SkeletonTaskDetail from "./components/skeleton-task-detail";
import styles from "./styles";
import TaskInfo from "./task-info";

// Làm mới API sau 30s;
const DELAY = 30000;

const TaskDetail = (props) => {
  const refCancelTask = useRef(null);
  const refChooseReason = useRef(null);
  const refConfirmCancelTask = useRef(null);
  const [error, setError] = useState({});
  const [dataTask, setDataTask] = useState<any | {}>({});
  const [reasonCancel, setReasonCancel] = useState();
  const [isShowLoading, setShowLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const I18n = useContext(LocalizationContext);

  const _openModalCancelTask = () => {
    refCancelTask.current?.open();
  };

  const _closeModalCancelTask = () => {
    refCancelTask.current?.close();
  };

  const _openModalChooseReason = () => {
    refChooseReason.current?.open();
  };

  const _closeModalChooseReason = () => {
    refChooseReason.current?.close();
  };

  const _openModalConfirmCancelTask = () => {
    refConfirmCancelTask.current?.open();
  };

  const _closeModalConfirmCancelTask = () => {
    refConfirmCancelTask.current?.close();
  };

  // Handle the cache of the confirmed task

  const getCacheTaskConfirmed = async () => {
    const listTask = await AsyncStorage.getItem(CACHE_TASK_CONFIRMED);
    return listTask ? JSON.parse(listTask) : {};
  };

  const setCacheTaskConfirmed = async (task) => {
    if (task.status !== statusTask.confirmed) return;
    try {
      const listTaskConfirmed = await getCacheTaskConfirmed();
      listTaskConfirmed[task?._id] = task;
      await AsyncStorage.setItem(CACHE_TASK_CONFIRMED, JSON.stringify(listTaskConfirmed));
    } catch (error) {}
  };

  const initData = async () => {
    // Set params
    const params: IParamGetTaskDetail = {
      taskId: props?.route?.params?.taskId,
      userId: getUserIdGlobal(),
    };
    // Call api get task detail
    const respond: IRespond = await getTaskDetailAPI(params);

    // Hide loading
    setShowLoading(false);
    // API trả về lỗi
    if (respond?.error?.code === NETWORK_REQUEST_FAILED) {
      const listTaskConfirmed = await getCacheTaskConfirmed();
      const taskFromCahe = listTaskConfirmed[props?.route?.params?.taskId];
      if (taskFromCahe) {
        return setDataTask(taskFromCahe);
      }
    }
    if (respond?.error) {
      return setError(respond?.error);
    }
    // API trả về data null
    if (_.isEmpty(respond?.data)) {
      // Get data task from store
      const { tasksPosted } = store.getState().newTasks;
      // Clone new array
      const newDataNewTask = _.cloneDeep(tasksPosted);
      // Find index in new array
      const index = newDataNewTask.findIndex((item) => item?._id === props?.route?.params?.taskId);
      // Remove item in new array
      newDataNewTask.splice(index, 1);
      // Save new array to store
      store.dispatch(setTasksPosted(newDataNewTask));
      // Show alert
      return Alert.alert.open({
        message: "TASK_DETAIL.TASK_WAS_CONFIRMED",
        onClosed: () => {
          props?.navigation.goBack();
        },
      });
    }
    // Save data to state
    setCacheTaskConfirmed(respond?.data);
    trackingViewTask(respond?.data);
    return setDataTask(respond?.data);
  };

  React.useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(async () => {
      // Init data
      initData();
    });
    // Gọi realtime task
    const interval = setInterval(() => {
      initData();
    }, DELAY);
    return () => {
      interactionPromise.cancel();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Full to refresh data task detail
  const onRefresh = React.useCallback(async () => {
    // Show refreshing
    setRefreshing(true);
    // Init data task detail
    initData();
    // Hide refreshing
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show skeleton when call api and data task empty
  if (isShowLoading && _.isEmpty(dataTask)) return <SkeletonTaskDetail />;

  // Throw error
  if (!_.isEmpty(error)) {
    return (
      <Container>
        <Card flex>
          <ErrorScreen />
        </Card>
      </Container>
    );
  }
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        testID="scrollTaskDetail"
        bounces={false}
        disableScrollViewPanResponder={true}
        disableIntervalMomentum={true}
      >
        {/* Task info */}
        <TaskInfo
          dataTask={dataTask}
          setDataTask={setDataTask}
          navigation={props.navigation}
          openModalCancelTask={_openModalCancelTask}
        />
        {/* End task info */}
      </ScrollView>

      {/* Modal cancel */}
      <Modal
        ref={refCancelTask}
        HeaderComponent={
          <Box center>
            <Text
              variant="h2"
              color="black"
              style={styles.txtHeaderModal}
            >
              {I18n.t("TASK_DETAIL.TITLE_CANCEL_TASK")}
            </Text>
          </Box>
        }
      >
        <ContentModalCancel
          dataTask={dataTask}
          closeModalCancel={_closeModalCancelTask}
          openModalChooseReason={_openModalChooseReason}
        />
      </Modal>
      {/* End modal cancel */}

      {/* Modal choose reason cancel */}
      <Modal
        ref={refChooseReason}
        HeaderComponent={
          <Box center>
            <Text
              variant="h2"
              color="black"
              style={styles.txtHeaderModal}
            >
              {I18n.t("TASK_DETAIL.TITLE_CANCEL_TASK")}
            </Text>
          </Box>
        }
      >
        <ContentModalChooseReason
          taskDate={dataTask?.date}
          collectionDate={dataTask?.collectionDate}
          locationTask={{ lat: dataTask.lat, lng: dataTask.lng }}
          openModalConfirmCancelTask={_openModalConfirmCancelTask}
          closeModalChooseReason={_closeModalChooseReason}
          setReasonCancel={setReasonCancel}
          reasonCancel={reasonCancel}
        />
      </Modal>
      {/* End modal choose reason cancel */}

      {/* Modal confirm cancel task */}
      <Modal
        ref={refConfirmCancelTask}
        HeaderComponent={
          <Box center>
            <Text
              variant="h2"
              color="black"
              style={styles.txtHeaderModal}
            >
              {I18n.t("TASK_DETAIL.TITLE_CANCEL_TASK")}
            </Text>
          </Box>
        }
      >
        <ContentModalConfirmCancelTask
          dataTask={dataTask}
          closeModalConfirmCancelTask={_closeModalConfirmCancelTask}
          reasonCancel={reasonCancel}
          navigation={props?.navigation}
        />
      </Modal>
      {/* End modal confirm cancel task */}
    </Container>
  );
};

export default TaskDetail;
