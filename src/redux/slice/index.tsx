// Nơi sẽ khai báo các reducer mới
import userRewardReducer from "screens/bReward/slice";
import getMonthlyReducer from "screens/monthly-reward/slice";
import ratingAskerReducer from "screens/rating/slice";
import registerReducer from "screens/register/slice";
import uploadImageReducer from "screens/supplement-profile/slice";
import myTaskReducer from "screens/tab-home-my-tasks/slice";
import newTasksReducer from "screens/tab-home-new-tasks/slice";
import notificationReducer from "screens/tab-notification/slice";
import trainingInputReducer from "screens/training-input-tasker/slice";
import trainingPremiumReducer from "screens/training-premium-tasker/slice";
import notifySocketReducer from "web-sockets/notification/slice";
import tasksSocketReducer from "web-sockets/task/slice";

import { reducers, store } from "redux/store";

import appReducer from "./app-slice";

export default {
  app: appReducer,
  register: registerReducer,
  myTasks: myTaskReducer,
  tasksSocket: tasksSocketReducer,
  newTasks: newTasksReducer,
  trainingInput: trainingInputReducer,
  trainingPremium: trainingPremiumReducer,
  userReward: userRewardReducer,
  notification: notificationReducer,
  getMonthlyReward: getMonthlyReducer,
  ratingAsker: ratingAskerReducer,
  notifySocket: notifySocketReducer,
  uploadImage: uploadImageReducer,
};

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
