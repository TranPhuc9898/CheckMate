import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { checkMyAcceptedTask, IRespond } from "libs/helper";
import getNewTaskAPI, { IGetNewTask } from "apis/tasks/get-new-task";
import { statusTask } from "libs/config";
import { store } from "redux/store";

interface IMyTasks {
  tasksPosted: any;
  tasksWaiting: any;
  filterBy: string;
  isTaskerWorkingPlaces: boolean;
  limit: number;
  page: number;
  isGetAllData: boolean;
}

const initialState: IMyTasks = {
  tasksPosted: [],
  tasksWaiting: [],
  filterBy: "",
  isTaskerWorkingPlaces: false,
  limit: 20,
  page: 1,
  isGetAllData: false,
};

const slice = createSlice({
  name: "newTasks",
  initialState: initialState,
  reducers: {
    // Set list task posted to reducer
    setTasksPosted: (state, action) => {
      state.tasksPosted = action.payload;
    },
    // Set list task waiting to reducer
    setTasksWaiting: (state, action) => {
      state.tasksWaiting = action.payload;
    },
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    },
    setFilterWithArea: (state, action) => {
      state.isTaskerWorkingPlaces = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setGetAllData: (state, action) => {
      state.isGetAllData = action.payload;
    },
    // Reset data incentive
    resetLazyLoadState: (state) => {
      state.limit = 20,
      state.page = 1,
      state.isGetAllData = false,
      state.tasksPosted = [],
      state.tasksWaiting = []
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const {
  setTasksPosted,
  setTasksWaiting,
  setFilter,
  setFilterWithArea,
  setPage,
  resetLazyLoadState,
  setGetAllData,
  resetState
} = slice.actions;

// Check referral code and save to reducer
export const onGetNewTasks = () => async (dispatch: any) => {
  const {
    tasksPosted,
    limit,
    page,
    filterBy,
    isTaskerWorkingPlaces,
    isGetAllData,
  } = store.getState().newTasks;
  // Check data is full, no call api, avoid spam server
  if (isGetAllData) {
    return { isSuccess: true };
  }
  const params: IGetNewTask = {
    sortBy: filterBy,
    isTaskerWorkingPlaces: isTaskerWorkingPlaces,
    page: page,
    limit: limit,
  };
  // Call api get new task
  const newTasks: IRespond = await getNewTaskAPI(params);
  // Success
  if (newTasks?.error) {
    return newTasks;
  }
  // Get data from api
  const resultData = _.get(newTasks?.data, "newTasks", []);

  // Merge data newTask new to data newTask
  let newDataNewTask = _.cloneDeep(tasksPosted);
  if (page === 1) {
    newDataNewTask = resultData;
  } else {
    // filter vào list
    !_.isEmpty(resultData) &&
      resultData.forEach((task) => {
        // Find index in new array
        const index = newDataNewTask.findIndex(
          (item) => item?._id === task?._id
        );
        if (index !== -1) {
          // Update task to new array
          newDataNewTask[index] = task;
        } else {
          // Push task to new array
          newDataNewTask.push(task);
        }
      });
  }
  // Update array = new array
  dispatch(setTasksPosted(newDataNewTask));

  // Check full data
  if (
    resultData.length === 0 ||
    resultData.length < limit ||
    newDataNewTask.length < limit
  ) {
    dispatch(setGetAllData(true));
  }
  const resultTaskWaiting = _.get(newTasks?.data, "waitingTasks", []);
  // Task waiting
  dispatch(setTasksWaiting(resultTaskWaiting));
  return newTasks;
};

// Kiểm tra hiển thị task premium với tasker premium và tasker thường
const checkSeePremiumTask = (isPremium: Boolean) => {
  const { user } = store.getState().app;
  // Nếu task premium
  if (isPremium) {
    // Kiểm tra xem tasker có phải là tasker premium hay không?
    return Boolean(user?.isPremiumTasker === true);
  }
  // Nếu không -> return true
  return true;
};

// Lọc task posted theo status task, acceptedTasker và Premium
const filterTasksPosted = (tasksPostedNew) => {
  return tasksPostedNew.filter(
    (task) =>
      (task?.status === statusTask.posted ||
        task?.status === statusTask.waiting) &&
      !checkMyAcceptedTask(task?.acceptedTasker) &&
      checkSeePremiumTask(Boolean(task?.isPremium))
  );
};

// Lọc task waiting confirm theo status và accepted Tasker
const filterTasksWaiting = (taskWaitingNew) => {
  return taskWaitingNew.filter(
    (task) =>
      task?.status === statusTask.waiting &&
      checkMyAcceptedTask(task?.acceptedTasker)
  );
};

// Cập nhật newTask từ socket
export const onUpdateNewTasksSocket =
  (newTasksSocket, tasksPosted, tasksWaiting) => async (dispatch: any) => {
    // Check not update
    if (Boolean(_.isEmpty(newTasksSocket))) {
      return;
    }

    let taskPostedNew = _.cloneDeep(tasksPosted);
    let taskWaitingNew = _.cloneDeep(tasksWaiting);

    // Kiểm tra task đã có trong danh sách task POSTED hay không?
    const taskIndexPosted = taskPostedNew.findIndex(
      (e) => e._id === newTasksSocket.value
    );
    // Kiểm tra task có nằm trong danh sách task WAITING_ASKER_CONFIRMATION hay không?
    const taskIndexWaiting = taskWaitingNew.findIndex(
      (e) => e._id === newTasksSocket.value
    );

    if (taskIndexPosted !== -1) {
      // Nếu có => Cập nhật task
      taskPostedNew[taskIndexPosted] = {
        ...taskPostedNew[taskIndexPosted],
        ...newTasksSocket.data,
      };
    } else {
      // Nếu không => Thêm mới
      taskPostedNew.push(newTasksSocket.data);
    }

    // Nếu status task là WAITING_ASKER_CONFIRMATION
    // if (newTasksSocket?.data?.status === statusTask.waiting) {
    if (taskIndexWaiting !== -1) {
      // Nếu có => Cập nhật
      taskWaitingNew[taskIndexWaiting] = {
        ...taskWaitingNew[taskIndexWaiting],
        ...newTasksSocket.data,
      };
    } else {
      // Nếu chưa => Thêm mới
      taskWaitingNew.push(newTasksSocket.data);
    }
    // }

    // Lưu lại danh sách task WAITING_ASKER_CONFIRMATION mới
    dispatch(setTasksWaiting(filterTasksWaiting(taskWaitingNew)));
    // Lưu lại danh sách task POSTED mới
    dispatch(setTasksPosted(filterTasksPosted(taskPostedNew)));
  };
