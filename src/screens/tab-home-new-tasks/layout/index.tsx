import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Alert,
  Box,
  Button,
  Icon,
  TaskItem,
  Text,
  WarningAccountLocked,
} from "components";
import ItemLastTaskDetail from "../components/item-last-task-waiting";
import ItemTaskWaiting from "../components/item-task-waiting";
import styles from "./styles";
import SkeletonNewTasks from "../components/skeleton-new-tasks";
import ErrorScreen from "@src/screens/error/layout/index";
import { LocalizationContext } from "libs/context";
import { useSelector } from "react-redux";
import {
  onGetNewTasks,
  onUpdateNewTasksSocket,
  resetLazyLoadState,
  setGetAllData,
  setPage,
} from "../slice";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import * as Animatable from "react-native-animatable";
import FilterComponent from "../components/filter-new-task";
import { colors } from "libs/theme";
import { useFocusEffect } from "@react-navigation/native";
import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";
import Lottie from "components/lottie";
import { checkAnimationDisable } from "libs/helper";
import { USER_STATUS_LOCKED } from "libs/constants";
import { useAnimation } from "hooks/animation";

interface INewTaskScreen {
  navigation: any;
}
const NewTaskScreen: FC<INewTaskScreen> = ({ navigation }) => {
  const { tasksPosted, tasksWaiting, page, isGetAllData } = useSelector(
    (state: RootState) => state.newTasks
  );
  const { newTasksSocket } = useSelector(
    (state: RootState) => state.tasksSocket
  );
  const { user } = useSelector((state: RootState) => state.app);
  const [isShowFullTaskWaiting, setIsShowFullTaskWaiting] = useState(false);
  const [isShowLoading, setShowLoading] = useState(false);
  const [isLoadingFooter, setLoadingFooter] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const I18n = useContext(LocalizationContext);
  const scrollRef = useRef(null);

  // Init data my task
  const initData = useCallback(async () => {
    // Nếu không có data -> set loading
    _.isEmpty(tasksPosted) && setShowLoading(true);
    const result = await store.dispatch(onGetNewTasks());
    // Hide loading
    setShowLoading(false);
    if (!result.isSuccess) {
      // Set error
      return setError(result?.error);
    }
    // return setError(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        // Tracking CleverTap
        trackingCleverTapScreenView("New Task");

        // Reset get data when destroy
        initData();
      });

      return () => {
        // Reset get data when destroy
        store.dispatch(setGetAllData(false));
        // Clear interaction
        interaction.cancel();
      };
    }, [])
  );

  // Nhận socket
  useEffect(() => {
    // Check socket
    store.dispatch(
      onUpdateNewTasksSocket(newTasksSocket, tasksPosted, tasksWaiting)
    );
  }, [newTasksSocket]);

  const renderTaskWaiting = React.useMemo(() => {
    // Get last task waiting asker confirm
    const finalTaskWaiting = _.last(tasksWaiting);
    // Not have task return;
    if (!finalTaskWaiting) {
      return null;
    }
    // Show all task waiting asker confirm
    if (isShowFullTaskWaiting) {
      return (
        <Box style={styles.taskWaitingContainer}>
          <Box
            row
            center
            style={styles.lineTaskWaiting}
          >
            <Lottie
              style={[styles.lottieWaiting, styles.positionIcon]}
              source={require("assets/lottie/hourglass.json")}
              autoPlay={true}
              loop={true}
            />
            <Text
              center
              bold
              color="white"
            >
              {I18n.t("TASK_DETAIL.TITLE_TASK_WAITING")}
            </Text>
          </Box>
          <ScrollView>
            {tasksWaiting.map((item, index) => {
              return (
                <ItemTaskWaiting
                  key={index}
                  item={item}
                />
              );
            })}
          </ScrollView>
          <Button
            size="md"
            buttonStyle={styles.btnScrollUp}
            onPress={() => {
              setIsShowFullTaskWaiting(false);
              useAnimation("easeInEaseOut");
            }}
          >
            <Icon name="up" />
          </Button>
        </Box>
      );
    }
    // Show last task waiting asker confirm
    return (
      <ItemLastTaskDetail
        item={finalTaskWaiting}
        setIsShowFullTaskWaiting={setIsShowFullTaskWaiting}
        totalTaskWaiting={tasksWaiting.length}
      />
    );
  }, [isShowFullTaskWaiting, tasksWaiting]);

  // Full to refresh data new task
  const onRefresh = useCallback(async () => {
    // Show refreshing
    setRefreshing(true);
    // Reset data when refresh
    store.dispatch(resetLazyLoadState());
    // Init data new task
    await initData();
    // Hide refreshing
    setRefreshing(false);
  }, []);

  // Show when list task confirm empty
  const renderTasksEmpty = () => {
    return (
      <Box center>
        <Text>{I18n.t("TASK_DETAIL.NEW_TASK_EMPTY")}</Text>
      </Box>
    );
  };

  // Handle Filter
  const _handleFilter = async () => {
    // Hide alert
    Alert.alert.close();
    // Refresh data
    await onRefresh();
    // Scroll to top
    !_.isEmpty(tasksPosted) &&
      scrollRef?.current?.scrollToIndex({
        animated: !checkAnimationDisable(),
        index: 0,
      });
  };

  const _showFilterOption = () => {
    return Alert.alert.open({
      title: "FILTER_NEW_TASK.TITLE",
      message: <FilterComponent handleFilter={_handleFilter} />,
      actions: null,
    });
  };

  const _renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!isLoadingFooter) {
      return null;
    }
    return (
      <ActivityIndicator
        color={colors.primary}
        size="small"
        style={styles.loadingStyle}
      />
    );
  };

  const _handleLoadMore = async () => {
    // Nếu còn task thì tiếp tục tăng page lên 1
    !isGetAllData && store.dispatch(setPage(page + 1));
    // check wait for get data in complete, if get data api is complete, isLoadingData = false
    if (!isLoadingFooter) {
      setLoadingFooter(true);
      await store.dispatch(onGetNewTasks());
      setLoadingFooter(false);
    }
  };

  // Throw error
  if (Boolean(error)) {
    return (
      <ErrorScreen
        onPress={() => {
          setError(false);
          onRefresh();
        }}
      />
    );
  }

  // Show skeleton when call api
  if (isShowLoading && _.isEmpty(tasksPosted)) return <SkeletonNewTasks />;

  // Nếu status Tasker khác LOCKED -> return
  // if (user?.status === USER_STATUS_LOCKED) {
  //   return <WarningAccountLocked />;
  // }

  return (
    <>
      <FlatList
        ref={(ref) => {
          scrollRef.current = ref;
        }}
        data={tasksPosted}
        renderItem={({ item, index }) => (
          <TaskItem
            testID="newTask"
            item={item}
            index={index}
          />
        )}
        contentContainerStyle={styles.containerFlatList}
        ListHeaderComponent={renderTaskWaiting}
        ListHeaderComponentStyle={styles.containerHeaderComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={renderTasksEmpty}
        onEndReachedThreshold={0}
        onEndReached={_handleLoadMore}
        ListFooterComponent={_renderFooter}
        refreshing={isLoadingFooter}
        initialNumToRender={_.isEmpty(tasksPosted) ? null : 20}
        keyExtractor={(item) => item._id}
        maxToRenderPerBatch={_.isEmpty(tasksPosted) ? null : 20}
      />
      <Animatable.View
        style={styles.wrapBtnFilter}
        animation={checkAnimationDisable() ? null : "bounceIn"}
        useNativeDriver
        delay={1000}
      >
        <TouchableOpacity
          style={styles.txtFilter}
          testID="btnFilter"
          onPress={_showFilterOption}
        >
          <Icon
            name="filter"
            size="xxl"
          />
        </TouchableOpacity>
      </Animatable.View>
    </>
  );
};

export default NewTaskScreen;
