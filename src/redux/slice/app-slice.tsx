import { Platform } from "react-native";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { REHYDRATE } from "redux-persist";
import { resetState as resetStateReward } from "screens/bReward/slice";
import { getMonthlyReward, resetState as resetStateMonthlyReward } from "screens/monthly-reward/slice";
import { resetState as resetStateRating } from "screens/rating/slice";
import { resetState as resetStateRegister } from "screens/register/slice";
import { resetState as resetStateSupplementProfile } from "screens/supplement-profile/slice";
import { resetState as resetStateMyTasks } from "screens/tab-home-my-tasks/slice";
import { onGetNewTasks, resetLazyLoadState, resetState as resetStateNewTasks } from "screens/tab-home-new-tasks/slice";
import {
  getListNotificationSystem,
  getListNotificationTask,
  resetState as resetStateNotification,
} from "screens/tab-notification/slice";
import { resetState as resetStateTrainingInput } from "screens/training-input-tasker/slice";
import { resetState as resetStatTrainingPremium } from "screens/training-premium-tasker/slice";
import { resetState as resetStateSocketNotification } from "web-sockets/notification/slice";
import { resetState as resetStateSocket } from "web-sockets/task/slice";

import loginAPI, { ILogin } from "@src/apis/authentication/login";
import logoutAPI from "@src/apis/authentication/logout";
import { getAllSettingsAPI, getEnvironmentKeyAPI } from "@src/apis/settings";
import { getLastDoneTaskAPI, getUserInfoAPI, updateTaskerLanguageAPI } from "@src/apis/user";
import {
  getLocaleGlobal,
  getUserIdGlobal,
  getUsername,
  getVersionAppName,
  handleError,
  IRespond,
  navigateTo,
  openUrl,
  sendToSlack,
  setIsoCodeToGlobal,
  setLocaleToGlobal,
  setVarToGlobal,
} from "@src/libs/helper";
/* --------------------------- Tracking CleverTap --------------------------- */
import { trackingLoginSuccess, updateUserCleverTap } from "@src/libs/tracking/track-clever-tap";
import getNumberOfGiftAPI from "apis/breward/count-new-gift";
import checkCompareVersionAPI from "apis/check-compare-version";
import getListChatAPI from "apis/notification/get-notification-chat";
import getTrainingStepAPI from "apis/user/get-training-step";
import { Alert } from "components";
import { services } from "libs/config";
import {
  MODAL_ALERT_TASK,
  USER_STATUS_ACTIVE,
  USER_STATUS_IN_PROBATION,
  USER_STATUS_LOCKED,
  USER_STATUS_UNVERIFIED,
} from "libs/constants";
import { TASKER_NOT_FOUND, TOKEN_EXPIRED, USER_INACTIVE } from "libs/helper/error-code-list";
import { store } from "redux/store";

interface Loading {
  isShow: boolean;
  /**
   * Hiển thị text thường
   */
  content?: string;
  /**
   * Hiển thị text nằm trong localization
   */
  contentWithI18n?: string;
}

interface IModalAlert {
  /**
   * Hiển thị modal alert
   */
  isShow: boolean;
  /**
   * Dử liệu truyền vào modal
   */
  data: any;
  /**
   * Loại modal
   */
  name: any;
}

interface AppState {
  isLoadingWaitingPersist: boolean; // loading of splash screen
  loading: Loading; // loading of app
  user: any;
  locale: string;
  isoCode: string;
  settingSystem: any;
  environmentKey: any;
  services: any;
  countryCode: any;
  isFirstOpenApp: boolean; // show intro when first open app
  chooseSighUpOrLogin: boolean; // chọn đăng nhập hay đăng ký khi mở app lần đầu tiên
  newVersionInfo: any; // Check Version App
  userTracking: any; // Data dùng cho việc tracking
  listChat: any;
  isReadListChat: boolean;
  modalAlert: IModalAlert;
  isVibration: boolean;
  trainingStep: any;
  taskerProfileInfo: any;
  isShowModalSeeMoreJourney: boolean;
  numberOfGift: number;
}

const initialState: AppState = {
  isLoadingWaitingPersist: true,
  loading: {
    isShow: false,
    content: "",
  },
  user: null,
  locale: null,
  isoCode: null,
  settingSystem: null,
  environmentKey: null,
  services: null,
  countryCode: null,
  isFirstOpenApp: true,
  chooseSighUpOrLogin: false,
  newVersionInfo: null,
  userTracking: null,
  listChat: null,
  isReadListChat: false,
  modalAlert: {
    isShow: false,
    data: null,
    name: MODAL_ALERT_TASK,
  },
  isVibration: true,
  trainingStep: [],
  taskerProfileInfo: null,
  isShowModalSeeMoreJourney: true,
  numberOfGift: 0,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    //Check Version App
    checkVersion: (state, action) => {
      state.newVersionInfo = action.payload;
    },
    // Get List Chat
    setListChat: (state, action) => {
      state.listChat = action.payload;
    },
    setBadge: (state, action) => {
      const filterData = action.payload?.filter((item) => !item.isRead);
      state.isReadListChat = !_.isEmpty(filterData);
    },
    changeLocale: (state, action) => {
      state.locale = action.payload;
    },
    openLoading: (state, action) => {
      state.loading = {
        isShow: Boolean(action.payload.isShow),
        content: action.payload?.content,
        contentWithI18n: action.payload?.contentWithI18n,
      };
    },
    loginSuccess: (state, action) => {
      // save to global
      setVarToGlobal({
        userId: action.payload?.userId,
        userToken: action.payload?.token,
      });
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
    setEnvironmentKey: (state, action) => {
      state.environmentKey = action.payload;
    },
    // Set isoCode
    changeIsoCode: (state, action) => {
      state.isoCode = action.payload;
    },
    setLoadingPersist: (state, action) => {
      state.isLoadingWaitingPersist = false;
    },
    setUserInfo: (state, action) => {
      // không bao gồm userId, token
      const user = Object.assign(
        {
          userId: state.user.userId,
          token: state.user.token,
        },
        { ...action.payload }
      );
      state.user = user;
    },
    setFirstOpenApp: (state) => {
      state.isFirstOpenApp = false;
    },
    setSettings: (state, action) => {
      state.settingSystem = action.payload;
    },
    setSighUpOrLogin: (state) => {
      state.chooseSighUpOrLogin = true;
    },
    setUserTracking: (state, action) => {
      state.userTracking = action.payload;
    },
    openModalAlert: (state, action) => {
      state.modalAlert = {
        isShow: true,
        data: action.payload?.data,
        name: action.payload?.name,
      };
    },
    setVibration: (state, action) => {
      state.isVibration = action.payload;
    },
    hideModalAlert: (state) => {
      state.modalAlert = {
        isShow: false,
        data: null,
        name: MODAL_ALERT_TASK,
      };
    },
    setTrainingStep: (state, action) => {
      state.trainingStep = action.payload;
    },
    setTaskerProfileInfo: (state, action) => {
      state.taskerProfileInfo = action.payload;
    },
    setIsShowModalSeeMoreJourney: (state, action) => {
      state.isShowModalSeeMoreJourney = action.payload;
    },
    setNumberOfGift: (state, action) => {
      state.numberOfGift = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      // save to global, bắt buộc khi mở lại app
      setVarToGlobal({
        userId: action.payload?.app?.user?._id || action.payload?.app?.user?.userId,
        userToken: action.payload?.app?.user?.token,
        isoCode: action.payload?.app?.isoCode,
        locale: action.payload?.app?.locale,
      });
    });
  },
});

export default slice.reducer;

export const {
  loginSuccess,
  logoutSuccess,
  openLoading,
  changeLocale,
  setEnvironmentKey,
  changeIsoCode,
  setLoadingPersist,
  setUserInfo,
  setFirstOpenApp,
  setSettings,
  setSighUpOrLogin,
  checkVersion,
  setUserTracking,
  setListChat,
  setBadge,
  openModalAlert,
  hideModalAlert,
  setVibration,
  setTrainingStep,
  setTaskerProfileInfo,
  setIsShowModalSeeMoreJourney,
  setNumberOfGift,
} = slice.actions;

const updateProfileTracking = (newUser) => async (dispatch) => {
  const { userTracking } = store.getState().app;

  try {
    const dataUser: any = {
      city: _.get(newUser, "workingPlaces[0].city", null),
    };
    const params = [
      "_id",
      "name",
      "phone",
      "address",
      "language",
      "countryCode",
      "avatar",
      "taskDone",
      "appVersion",
      "isPremiumTasker",
      "avgRating",
      "status",
    ];

    _.forEach(params, (keyOfParam) => {
      dataUser[keyOfParam] = _.get(newUser, `${keyOfParam}`, null);
    });
    if (JSON.stringify(dataUser) !== JSON.stringify(userTracking)) {
      await dispatch(setUserTracking(dataUser));
      updateUserCleverTap(dataUser);
    }
  } catch (error) {}
};

/**
 * Mở hoặc tắt loading của app
 * @param isShow
 * @param content
 * @param contentWithI18n
 * @returns
 */
export const setLoading =
  (isShow: boolean, content: string = "", contentWithI18n: string = "") =>
  async (dispatch) => {
    dispatch(openLoading({ isShow, content, contentWithI18n }));
  };

/**
 * Login
 * @param params: {
 *    phone: "0834567891",
 *    password: "abc123",
 *    countryCode: "62"
 * }
 * @returns
 */
export const login = (params) => async (dispatch) => {
  // show loading
  await dispatch(setLoading(true));
  // Params
  const paramsLogin: ILogin = {
    username: getUsername(params?.phone, params?.countryCode),
    password: params.password,
    type: "TASKER",
  };
  // call api login
  const respond: IRespond = await loginAPI(paramsLogin);
  // hide loading
  await dispatch(setLoading(false));
  // success
  if (respond.isSuccess) {
    // tracking login
    await trackingLoginSuccess(params?.phone);

    // save to reducer
    dispatch(loginSuccess(respond.data));
    return;
  }
  if (respond?.error?.code === USER_INACTIVE) {
    return Alert.alert.open({
      message: "LOGIN.MESSAGE_ACCOUNT_ACTIVE",
      actions: [
        {
          text: "DIALOG.BUTTON_ACCEPT",
          onPress: () => {
            navigateTo("OTP", {
              phone: params?.phone,
              fromForgotPassword: false,
            });
            Alert.alert.close();
          },
        },
      ],
    });
  }
  // error
  handleError(respond?.error);
};

/**
 * Logout
 * @returns
 */
export const logout = () => async (dispatch) => {
  // show loading
  await dispatch(setLoading(true));
  // call api logout
  await logoutAPI();
  // hide loading
  await dispatch(setLoading(false));
  // call api logout
  dispatch(logoutSuccess(null));
  // Reset register slide
  dispatch(resetStateRegister());
  // Reset my task slide
  dispatch(resetStateMyTasks());
  // Reset new task slide
  dispatch(resetStateNewTasks());
  // Reset training input slide
  dispatch(resetStateTrainingInput());
  // Reset training premium slide
  dispatch(resetStatTrainingPremium());
  // Reset socket slide
  dispatch(resetStateSocket());
  // Reset notification slide
  dispatch(resetStateNotification());
  // Reset reward slide
  dispatch(resetStateReward());
  // Reset monthly reward
  dispatch(resetStateMonthlyReward());
  // Reset rating asker slide
  dispatch(resetStateRating());
  // Reset socket notification slide
  dispatch(resetStateSocketNotification());
  // Reset supplement profile slide
  dispatch(resetStateSupplementProfile());
  // remove all data from global
  setVarToGlobal({ userId: null, userToken: null });
};

// chọn ngôn ngữ
export const setLocale = (locale: any) => async (dispatch) => {
  // Set locale to global
  setLocaleToGlobal(locale);
  // Set locale to reducer
  dispatch(changeLocale(locale));
};

// Check referral code and save to reducer
export const getEnvironmentKey = () => async (dispatch: any) => {
  const respond: IRespond = await getEnvironmentKeyAPI();
  // Success
  if (respond.isSuccess) {
    dispatch(setEnvironmentKey(respond.data));
    return;
  }
};

// Check referral code and save to reducer
export const setIsoCode = (country: string) => async (dispatch: any) => {
  // Set isoCode to global
  setIsoCodeToGlobal(country);
  // Set isoCode to reducer
  dispatch(changeIsoCode(country));
};

/**
 * Lấy toàn bộ thông tin của user
 * @returns
 */
export const getUserInfo = () => async (dispatch) => {
  // call api login
  const respond: IRespond = await getUserInfoAPI();
  // success
  if (respond.isSuccess) {
    await dispatch(updateProfileTracking(respond.data));
    // save to reducer
    dispatch(setUserInfo(respond.data));
    return respond.data;
  }

  // user removed, token expired -> logout
  if (respond?.error.code === TASKER_NOT_FOUND || respond?.error.code === TOKEN_EXPIRED) {
    sendToSlack(
      `UserId: ${getUserIdGlobal()}\n
      ErrorCode: ${respond?.error.code}\n
      From: API`,
      "error-logout-tasker-v3"
    );
    return Alert.alert.open({
      message: "LOGIN.MESSAGE_TOKEN_EXPIRED",
      onClosed: () => dispatch(logout()),
    });
  }
};

/**
 * Lấy toàn bộ settings của app
 * @returns
 */
export const getAllSettings = () => async (dispatch) => {
  // call api login
  const respond: IRespond = await getAllSettingsAPI();
  // success
  if (respond.isSuccess) {
    // save to reducer
    dispatch(setSettings(respond.data));
    return null;
  }
};

/**
 * Get Version App
 */
export const checkVersionApp = () => async (dispatch) => {
  // Call api
  const params = {
    version: getVersionAppName(),
    platform: Platform.OS === "ios" ? "ios" : "android",
  };

  const respond: IRespond = await checkCompareVersionAPI(params.version, params.platform);

  // Nếu isMaintain hoặc có isForce thì lưu vào store
  if (respond?.data?.isMaintain || respond?.data?.newVersion?.isForce) {
    return dispatch(checkVersion(respond.data));
  }
  //Có lỗi hoặc không có newVersion -> return && Nếu không cos isForce -> show alert
  if (respond.isSuccess && respond?.data?.newVersion && !respond?.data?.newVersion?.isForce) {
    return setTimeout(() => {
      Alert.alert?.open(
        {
          title: "NEW_VERSION_APP.TITLE_BUTTON_UPDATE_VERSION",
          message: ["NEW_VERSION_APP.CONTENT_UPDATE_APP"],
          actions: [
            {
              testID: "btnNewVersion",
              text: "NEW_VERSION_APP.NEW_VERSION_BUTTON",
              onPress: () => {
                openUrl(respond?.data?.newVersion?.link);
              },
            },
            {
              text: "DIALOG.BUTTON_CLOSE",
              style: "cancel",
            },
          ],
        },
        true
      );
    }, 5000);
  }
};

/**
 * @description Kiểm tra quyền leader của task tổng vệ sinh
 * @param serviceName DEEP_CLEANING
 * @param acceptedTasker {taskerId: "abc", isLeader: true, ...}
 * @returns true | false
 */
export const checkPermissionLeaderOfTaskDeepCleaning = (serviceName: string, acceptedTasker: any) => {
  // Nếu khôhn phải task tổng vệ sinh
  if (serviceName !== services.deepCleaning) {
    return true;
  }
  // Kiểm tra user có phải leader k
  const isLeader = acceptedTasker.find((e) => e.isLeader === true && e.taskerId === getUserIdGlobal());
  // Leader => return true
  if (isLeader) {
    return true;
  }
  // return false
  return false;
};

/**
 * @description Get last done task
 * @return taskId | null
 */
export const getLastDoneTask = () => async (dispatch) => {
  const { user } = store.getState().app;
  // Nếu user là nhân viên thuộc công ty -> Không check done task

  if (user?.status === USER_STATUS_UNVERIFIED || (user?.isEmployee && !user?.isCompany)) {
    return;
  }
  const respond: IRespond = await getLastDoneTaskAPI();
  // success
  if (
    respond.isSuccess &&
    respond?.data &&
    checkPermissionLeaderOfTaskDeepCleaning(respond?.data?.task?.serviceName, respond?.data?.task?.acceptedTasker)
  ) {
    // save to reducer
    // dispatch(setIsRated(true));
    navigateTo("RatingAskerScreen", {
      task: respond.data?.task,
      asker: respond.data?.asker,
    });
    return;
  }
};

/**
 * @description Get list chat
 * @return
 */

export const getListChat = () => async (dispatch) => {
  // Call API
  const respond: IRespond = await getListChatAPI();
  if (respond?.isSuccess) {
    return store.dispatch(setListChat(respond?.data));
  }
  return handleError(respond?.error);
};

/**
 * Khởi tạo data khi mở trang Home
 * @param
 * @returns
 */
export const initData = () => async (dispatch) => {
  // Get user info
  const userInfo = await dispatch(getUserInfo());
  // Get local language
  const localLanguage = getLocaleGlobal();
  // If diff -> set user language = local language
  if (userInfo && userInfo?.language !== localLanguage) {
    // Set user language
    updateTaskerLanguageAPI({
      language: localLanguage,
    });
  }
  dispatch(getEnvironmentKey());
  dispatch(getAllSettings());
  dispatch(getLastDoneTask());
  dispatch(getMonthlyReward());
  dispatch(getNumberOfGift());
  await dispatch(getListNotificationTask());
  dispatch(getListNotificationSystem());
};

export const refreshDataHome = () => async (dispatch) => {
  // Reset lazy load state
  dispatch(resetLazyLoadState());
  // Loading app
  dispatch(setLoading(true));
  // Get data new tasks
  dispatch(onGetNewTasks());
  // Hide loading app
  dispatch(setLoading(false));
};

export const getTrainingStep = () => async (dispatch) => {
  const { user, trainingStep } = store.getState().app;
  // Check user status before get training step
  const validStatuses = [USER_STATUS_ACTIVE, USER_STATUS_LOCKED, USER_STATUS_IN_PROBATION];
  if (validStatuses.includes(user?.status)) {
    return;
  }
  // Loading app nếu k có data
  _.isEmpty(trainingStep) && dispatch(setLoading(true));
  // Get data training step
  const respond: IRespond = await getTrainingStepAPI();
  // Hide loading app
  dispatch(setLoading(false));
  // success
  if (respond.isSuccess) {
    dispatch(setTrainingStep(respond.data?.trainingStep));
    dispatch(setTaskerProfileInfo(respond.data?.taskerProfileInfo));
  }
};

export const getNumberOfGift = () => async (dispatch) => {
  // Call API
  const respond: IRespond = await getNumberOfGiftAPI();
  if (respond?.isSuccess) {
    return store.dispatch(setNumberOfGift(respond.data?.totalNewGifts || 0));
  }
};
