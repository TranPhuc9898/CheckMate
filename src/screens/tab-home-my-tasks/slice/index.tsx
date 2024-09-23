import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LIMIT_DATE_OF_CACHE_TASK_CONFIRMED,
  CACHE_TASK_CONFIRMED,
} from "libs/constants";
import _ from "lodash";
import moment from "moment";
import { checkMyAcceptedTask, handleError, IRespond } from "libs/helper";
import getMyTasksAPI from "apis/tasks/get-my-task";
import { statusTask } from "libs/config";

interface IMyTasks {
  listDataTask: Array<any>;
}

const initialState: IMyTasks = {
  listDataTask: [],
};

const slice = createSlice({
  name: "myTasks",
  initialState: initialState,
  reducers: {
    // Set list task confirmed to reducer
    setMyTasks: (state, action) => {
      state.listDataTask = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const { setMyTasks, resetState } = slice.actions;

// Check referral code and save to reducer
export const onGetMyTasks = (setShowLoading: any) => async (dispatch: any) => {
  // Show loading
  await setShowLoading(true);
  // Get new task from api
  const myTasks: IRespond = await getMyTasksAPI();
  // Hide loading
  await setShowLoading(false);
  // Success
  if (myTasks.isSuccess) {
    return dispatch(setMyTasks(myTasks?.data));
  }
  return handleError(myTasks?.error);
};

// Filter task confirmed
const filterTasksWaiting = (taskWaitingNew) => {
  return taskWaitingNew.filter(
    (task) =>
      task?.status === statusTask.confirmed &&
      checkMyAcceptedTask(task?.acceptedTasker)
  );
};

// Cập nhật newTask từ socket
export const onUpdateMyTasksSocket =
  (myTasksSocket, tasksConfirmed) => async (dispatch: any) => {
    // Check not update
    if (Boolean(_.isEmpty(myTasksSocket))) {
      return;
    }

    let tasksConfirmedNew = _.cloneDeep(tasksConfirmed);
    // Kiểm tra task đã có trong danh sách task CONFIRMED hay không?
    const taskIndex = tasksConfirmedNew.findIndex(
      (e) => e._id === myTasksSocket.value
    );
    if (taskIndex !== -1) {
      // Nếu có trong danh sách => Cập nhật task
      tasksConfirmedNew[taskIndex] = {
        ...tasksConfirmedNew[taskIndex],
        ...myTasksSocket.data,
      };
    } else {
      // Nếu không có trong danh sách => Thêm mới
      tasksConfirmedNew.push(myTasksSocket.data);
    }
    // Lưu lại danh sách task POSTED mới
    dispatch(setMyTasks(filterTasksWaiting(tasksConfirmedNew)));
  };

// Handle the cache of the confirmed task
export const removeCacheTaskConfirmed = async () => {
  const listTask = await AsyncStorage.getItem(CACHE_TASK_CONFIRMED);
  let listTaskConfirmed = listTask ? JSON.parse(listTask) : {};
  if (_.isEmpty(listTaskConfirmed)) return null;

  // Loại bỏ những task đã cũ quá 3 ngày
  Object.keys(listTaskConfirmed).forEach(function (key) {
    if (
      moment()
        .subtract(LIMIT_DATE_OF_CACHE_TASK_CONFIRMED, "day")
        .isAfter(moment(listTaskConfirmed[key]?.date))
    ) {
      delete listTaskConfirmed[key];
    }
  });

  await AsyncStorage.setItem(
    CACHE_TASK_CONFIRMED,
    JSON.stringify(listTaskConfirmed)
  );
};
