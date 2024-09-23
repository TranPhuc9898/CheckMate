import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getNotificationSystemAPI, {
  IParamNotificationSystem,
} from "apis/notification/get-notification-system";
import setIsReadAllNotificationAPI from "apis/notification/set-read-all-notification";
import { handleNotification, IRespond, navigateTo } from "libs/helper";
import { openModalAlert } from "redux/slice/app-slice";
import { store } from "redux/store";
import _ from "lodash";
import { NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY } from "libs/constants";
import { listTypeShowModalAlert } from "libs/config";
import isReadNotification from "apis/notification/read-notification";

interface NotificationState {
  listNotificationTask: any;
  listNotificationSystem: any;
  isReadNotification: boolean;
}

const initialState: NotificationState = {
  listNotificationTask: null,
  listNotificationSystem: null,
  isReadNotification: false,
};

export const NotificationSlice = createSlice({
  name: "NotificationSlice",
  initialState: initialState,
  reducers: {
    setListNotificationSystem: (state, action) => {
      state.listNotificationSystem = action.payload;
    },
    setListNotification: (
      state,
      action: PayloadAction<IParamNotificationSystem>
    ) => {
      state.listNotificationTask = action.payload;
    },
    setBadgeNotification: (state, action) => {
      const filterData = action.payload?.filter((item) => !item.isRead);
      state.isReadNotification = !_.isEmpty(filterData);
    },
    resetState: () => initialState,
  },
});

export default NotificationSlice.reducer;

export const {
  setListNotification,
  setBadgeNotification,
  setListNotificationSystem,
  resetState
} = NotificationSlice.actions;

/**
 * Get API Task Notification
 * Thông Báo công việc
 */
export const getListNotificationTask = () => async (dispatch) => {
  // set loading
  const params: IParamNotificationSystem = {
    getTypeFrombTaskee: false,
    limit: 30,
    page: 1,
  };
  const respond: IRespond = await getNotificationSystemAPI(
    params.limit,
    params.page,
    params.getTypeFrombTaskee
  );
  if (!respond?.isSuccess) {
    return;
  }
  // Kiểm tra thông báo Chúc mừng sinh nhật
  const notifyHappyBirthday = respond?.data?.find(
    (item) => item?.title === NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY && !item?.isRead
  );
  // Nếu có -> navigateTo HappyBirthdayTasker
  if (!_.isEmpty(notifyHappyBirthday)) {
    return navigateTo("HappyBirthdayTasker", {data: notifyHappyBirthday})
  }
  // Kiểm tra có thông báo tiền tip mới không
  const notify = respond?.data?.find(
    (item) => listTypeShowModalAlert.includes(item?.data?.name) && !item?.isRead
  );
  // Nếu có -> show modal alert tip
  if (!_.isEmpty(notify)) {
    store.dispatch(
      openModalAlert({
        data: {
          ...notify?.data,
          title: notify?.title,
          image: notify?.image,
          notifyId: notify?._id,
          navigateTo: notify?.navigateTo,
          description: notify?.description,
        },
        name: notify?.data?.name,
      })
    );
  }
  return dispatch(setListNotification(respond?.data));
};

/**
 * API get list notification from system
 * Thông Báo có tin tức mới
 */
export const getListNotificationSystem = () => async (dispatch) => {
  // set loading
  const params: IParamNotificationSystem = {
    getTypeFrombTaskee: true,
    limit: 10,
    page: 1,
  };
  const respond: IRespond = await getNotificationSystemAPI(
    params.limit,
    params.page,
    params.getTypeFrombTaskee
  );
  if (!respond?.isSuccess) {
    return;
  }
  dispatch(setListNotificationSystem(respond?.data));
  // TODO: Đợi api chỉnh lại isForce rồi mở
  // /**
  //  * Xử lý thông báo có isForce
  //  * Lấy toàn bộ thông báo (Ưu tiên thông báo từ hệ thống rồi mới đến thông báo công việc)
  //  * Nếu có isForce = true và isRead = false thì handleNotification 
  //  */
  // // Lấy danh sách thông báo công việc
  // const { listNotificationTask } = store.getState().notification;
  // // Kết hợp với danh sách thông báo hệ thống
  // let listNotification = [...respond?.data, ...listNotificationTask];
  // // Kiểm tra thông báo có isForce và chưa đọc
  // const notificationForce = listNotification?.find((item) => item?.isForce && !item?.isRead);
  // // Nếu có thì 
  // if (notificationForce) {
  //   // Điều hướng thông báo
  //   handleNotification(notificationForce);
  //   // Đánh dấu đã đọc
  //   isReadNotification(notificationForce?._id);
  // }
  return;
};

/**
 * Get API Task Lasted Notification
 * Thông Báo có tin tức mới
 */
export const setIsReadAllNotification = () => async (dispatch) => {
  const respond: IRespond = await setIsReadAllNotificationAPI();
  if (!respond?.isSuccess) {
    return;
  }
  dispatch(getListNotificationTask());
  return dispatch(getListNotificationSystem());
};
