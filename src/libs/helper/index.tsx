import "moment/locale/id";
import "moment/locale/th";
import "moment/locale/vi";

import * as React from "react";
import { Linking, PermissionsAndroid, Platform } from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import Geolocation from "react-native-geolocation-service";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";
import notifee from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import CleverTap from "clevertap-react-native";
import _ from "lodash";
import moment from "moment";
import { LunarDate } from "vietnamese-lunar-calendar";

import { Alert } from "@src/components";
import { IAlertInfo } from "@src/components/alert";
import errorList from "@src/libs/helper/error-code-list";
import sendTokenToServerAPI from "apis/notification/push-notification";
import acceptTaskAPI, { IParamAcceptTask } from "apis/tasks/accept-task";
import {
  countries,
  defaultLocale,
  listAccessApiKey,
  modeConfig,
  NATIONAL_HOLIDAYS,
  webSocketEnpointKey,
} from "libs/config";
import {
  CASH,
  G_ISO_CODE,
  G_LOCALE,
  G_USER_ID,
  G_USER_TOKEN,
  INDONESIA,
  LIMIT_DATE,
  NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY,
  TH,
  THAILAND,
  VIETNAM,
} from "libs/constants";
import I18n from "libs/localization";
import { fontFamily, fontKanit } from "libs/theme";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

const TIMEOUT_WAIT_RESPOND = 30000;
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
export const REFERRAL_CODE_PATTERN = "referralCode=";

export const isIOS = Boolean(Platform.OS.toLowerCase() === "ios");
export const isAndroid = Boolean(Platform.OS.toLowerCase() === "android");
interface SerializedError {
  code: string;
  message: string;
  errorText?: any;
  data?: any;
}

export interface IRespond {
  isSuccess?: boolean;
  status?: "success" | "error";
  data?: any;
  error?: SerializedError;
}

/**
 * @description Get Access ApiKey by isoCode
 * Mỗi quốc gia sẽ có 1 Access Api Key riêng
 */
export const getAccessApiKey = () => {
  return listAccessApiKey[getIsoCodeGlobal()];
};

/**
 * @description get WebSocket Url by isoCode
 * Mỗi quốc gia sẽ có 1 Enpoint Key riêng và trung với Access Api Key của quốc gia đó
 */
export const getWebSocketUrl = () => {
  return `${
    webSocketEnpointKey[getIsoCodeGlobal()]
  }&userId=${getUserIdGlobal()}`;
};

export const fetchAPI = (path: string = "", params: any = {}, method: string = "post") =>
  new Promise((resolve, reject) => {
    let url = `${Config.SERVER_API_IP}/api/${path}`;
    if (Config.SERVER_API_PORT) {
      url = `${Config.SERVER_API_IP}:${Config.SERVER_API_PORT}/api/${path}`;
    }
    // const metadata = JSON.stringify({
    //   version: config.APP_VERSION_NAME,
    // });
    let newOptions = {
      data: {
        ...params,
        // metadata,
      },
    };
    if (method === "get") {
      newOptions = {
        params: {
          ...params,
          // metadata,
        },
      };
    }
    const headers = {
      "content-type": "application/json",
      accessKey: getAccessApiKey(),
    };
    axios({
      method,
      headers,
      url,
      timeout: TIMEOUT_WAIT_RESPOND,
      ...newOptions,
    })
      .then(function (response) {
        // handle success
        if (isDebuggingInChrome) {
          console.log("============FETCH API URL ========================");
          console.log(url);
          console.log("====================================");
          console.log("============FETCH API HEADER ========================");
          console.log(headers);
          console.log("====================================");
          console.log("============FETCH API OPTIONS ========================");
          console.log(newOptions);
          console.log("====================================");
          console.log("============FETCH API RESPOND ========================");
          console.log(response.data);
          console.log("====================================");
        }
        // success
        if (response && response.status === 200) {
          const res: IRespond = {
            isSuccess: true,
            status: "success",
            data: _.get(response, "data", {}),
          };
          resolve(res);
          return;
        }
        // error
        throw response;
      })
      .catch(function (error) {
        // send to Slack
        if (error && error?.response?.status === 502) {
          sendToSlack(
            `[Tasker Client] API error 502: \n- Url: ${url} \n- Options: ${JSON.stringify(
              newOptions
            )}\n - Response: ${JSON.stringify(error?.response?.data)}\n - Responses: ${JSON.stringify(error)}`,
            "api-error-502"
          );
        }

        // Handling Errors
        // The request was made but no response was received
        let errorrData: SerializedError = {
          code: "NETWORK_REQUEST_FAILED",
          message: "Network request failed",
          data: "Network request failed",
        };
        // 404 page not found
        if (error?.response?.status === 404 && typeof error?.response?.data === "string") {
          errorrData = {
            code: "404",
            message: "404 page not found",
            data: "404 page not found",
          };
        } else if (error?.response?.status) {
          // error valid data
          errorrData = _.get(error, "response.data.error", {});
        }
        // logger
        if (isDebuggingInChrome) {
          console.log("============FETCH API URL ========================");
          console.log(url);
          console.log("====================================");
          console.log("============FETCH API HEADER ========================");
          console.log(headers);
          console.log("====================================");
          console.log("============FETCH API OPTIONS ========================");
          console.log(newOptions);
          console.log("====================================");
          console.log("============FETCH API ERROR ========================");
          console.log(error.response);
          console.log(errorrData);
          console.log("====================================");
        }

        // send error data
        const res: IRespond = {
          isSuccess: false,
          status: "error",
          error: errorrData,
        };
        resolve(res);
      });
  });

export const sendToSlack = (text = "Post to slack", channel = "api-error-tasker-v3") => {
  if (isDebuggingInChrome) {
    return;
  }
  try {
    let apiURL = Config.SLACK_POST_API_URL;
    apiURL += "?token=" + Config.SLACK_POST_TOKEN;
    apiURL += "&channel=" + channel;
    apiURL += "&as_user=btaskee bot";
    apiURL += "&text=" + text;

    fetch(apiURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (ex) {}
};

export const validEmail = (email: string) => {
  if (!email) {
    return false;
  }
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailRegExExtension = /.con$/;
  const resultSyntax = new RegExp(emailRegEx).test(email);
  const resultExtension = new RegExp(emailRegExExtension).test(email);
  return resultSyntax && !resultExtension;
};

export const validatePassword = (password: string) => {
  const passRegex = /^\S{6,12}$/;
  return new RegExp(passRegex).test(password);
};

export const validateName = (name) => {
  if (!name) {
    return false;
  }
  const nameRegex = /[0-9`~!@#$%^&*()_|+\-=?;:'"£,.<>\{\}\[\]\\\/]/;
  const isWrongName = new RegExp(nameRegex).test(name);
  return !isWrongName;
};

export const validPhoneNumber = (phoneNumber: string, countryCode = "+84") => {
  if (!phoneNumber || phoneNumber.length > 11) {
    return false;
  }
  let phoneRegex: any = "";
  switch (countryCode) {
    case "+1":
      phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return new RegExp(phoneRegex).test(phoneNumber);
    case "+852":
      phoneRegex = /^1[0-9]{10}$|^[569][0-9]{7}$/;
      return new RegExp(phoneRegex).test(phoneNumber);
    case "+84":
      //maximum 10 character
      if (phoneNumber.length > 10) {
        return false;
      }
      // check exist fist string is 0
      if (phoneNumber[0].toString() === "0") {
        phoneRegex =
          /^[0][9]\d{8}$|[0][8][1-9]\d{7}$|[0][1][2|6|8|9]\d{8}$|[0][5][2|6|8|9]\d{7}$|[0][3][2-9]\d{7}$|[0][7][0|6|7|8|9]\d{7}$/;
      } else {
        phoneRegex =
          /^[9]\d{8}$|[8][1-9]\d{7}$|[1][2|6|8|9]\d{8}$|[5][2|6|8|9]\d{7}$|[3][2-9]\d{7}$|[7][0|6|7|8|9]\d{7}$/;
      }
      //phoneRegex = /^[0][9]\d{8}$|[0][8][6|8|9]\d{7}$|[0][1][2|6|8|9]\d{8}$/;
      return new RegExp(phoneRegex).test(phoneNumber);
    case "+66":
      if (phoneNumber.length > 10) {
        return false;
      }
      // check exist fist string is 0
      if (phoneNumber[0].toString() === "0") {
        phoneRegex = /^[0][6]\d{8}$|[0][8]\d{8}$|[0][9]\d{8}$/;
      } else {
        phoneRegex = /^[6]\d{8}$|[8]\d{8}$|[9]\d{8}$/;
      }
      return new RegExp(phoneRegex).test(phoneNumber);
    case "+62":
      phoneRegex = /^(\+628|628|08|8)[1-9][0-9]{6,9}$/;
      return new RegExp(phoneRegex).test(phoneNumber);

    default:
      return false;
  }
};

/**
 * @desciption Dùng để lấy số điện thoại không bao gồm ký tự đặc biệt
 * @param phone
 * @returns 0834567890
 */
export const getPhoneNumberRex = (phone: string) => {
  return phone.replace(/\D+/g, "");
};

/**
 * @description refactor PhoneNumber with countryCode
 * @param phone
 * @param countryCode
 * @returns
 * 0987860977 if phoneNumber is 987860977 (countryCode = TH, VN)
 * 0987860977 if phoneNumber is 0987860977 (countryCode = TH, VN)
 */
export const getPhoneNumber = (phone: string, countryCode: any) => {
  // countryCode = countryCode.match(/\d+/);
  // auto add 0 prefix phone number for viet nam, thai land
  if ((countryCode === "+84" || countryCode === "+66" || countryCode === "+62") && phone[0] !== "0") {
    phone = "0" + phone;
  }
  return phone;
};

/**
 * @desciption Hiển thị thông báo lỗi tương ứng sau khi gọi API
 * @param error
 * @returns
 */
export const handleError = (error: SerializedError, onClosed?: () => void) => {
  // Hiển thị mặc đinh: Có lỗi xảy ra + [Mã lỗi]
  const objectAlert: IAlertInfo = {
    title: "DIALOG.TITLE_ERROR",
    message: [{ text: "ERROR.ERROR_TRY_AGAIN", params: { t: error?.code || "" } }],
    actions: [{ text: "DIALOG.BUTTON_CLOSE" }],
  };
  // Tìm mã lỗi trong danh sách mã lỗi
  const errorData = _.find(errorList, (element: any) => element.code === error?.code);
  // show lỗi tương ứng
  if (errorData) {
    objectAlert.message = "ERROR." + errorData.code;
  } else if (error?.errorText) {
    // Mã lỗi chưa được định nghĩa, show theo message trả về
    objectAlert.message = [{ text: getTextWithLocale(error?.errorText), notUsedI18n: true }];
  }

  // Khi đóng alert sẽ chạy function onClosed nếu có
  if (onClosed) {
    objectAlert.onClosed = onClosed;
  }

  return Alert.alert.open(objectAlert, true);
};

/**
 * @description Set locales for variable global
 */
export const setLocaleToGlobal = (value: string) => {
  global[G_LOCALE] = value;
};

/**
 * @description Get locales for variable global
 */
export const getLocaleGlobal = () => {
  return global[G_LOCALE];
};

/**
 * @description Set userId for variable global
 */
export const setUserIdToGlobal = (value: string) => {
  global[G_USER_ID] = value;
};

/**
 * @description Get userId for variable global
 */
export const getUserIdGlobal = () => {
  return global[G_USER_ID];
};

/**
 * @description Set isoCode for variable global
 */
export const setIsoCodeToGlobal = (value: string) => {
  global[G_ISO_CODE] = value;
};

/**
 * @description Get isoCode for variable global
 */
export const getIsoCodeGlobal = () => {
  return global[G_ISO_CODE];
};

/**
 * @description Set user token for variable global
 */
export const setUserTokenToGlobal = (value: string) => {
  global[G_USER_TOKEN] = value;
};

/**
 * @description Get user token for variable global
 */
export const getUserTokenGlobal = () => {
  return global[G_USER_TOKEN];
};
export interface IObjectText {
  en: string;
  vi: string;
  ko?: string;
  id?: string;
  th?: string;
}

/**
 * @description: get text from Object by locale
 * @param objectText Object
 * {vi, en, ko, th}
 * @param locale String
 * @returns String
 * text.locale or text.en
 */
export const getTextWithLocale = (objectText: IObjectText) => {
  const localeGetText = getLocaleGlobal();
  const text = "";
  if (!objectText) return text;
  return _.get(objectText, localeGetText, null)
    ? _.get(objectText, localeGetText, null)
    : _.get(objectText, defaultLocale, "");
};

/**
 * Do costDetail.finalCost là giá sau khi áp dụng promotion nên không được sử dụng
 * Thay vào đó phải sử dụng costDetail.cost vì đây là số tiền thực tế của công việc
 * @param costDetail Chi tiết về giá của task
 * @param newCostDetail Được sinh ra khi update task trả trước và có thay đổi về giá
 * @returns
 */
export const getTaskCost = (
  costDetail: any,
  newCostDetail: any,
  showFullCostDetail?: boolean
) => {
  let taskCost = _.get(costDetail, "cost", 0);
  let newTaskCost = _.get(newCostDetail, "cost", 0);

  // Khi task được confirmed, sẽ hiển thị chi tiết số tiền cần thu của khách hàng, số tiền được cộng vào tài khoản khuyến mãi (task promotion)
  if (showFullCostDetail) {
    taskCost = _.get(costDetail, "finalCost", 0);
    newTaskCost = _.get(newCostDetail, "finalCost", 0);
  }

  // New cost when prepay task is updated
  if (newTaskCost > taskCost) {
    return newTaskCost;
  }
  return taskCost;
};

/**
 * @param requirements
 *
 * @returns array
 */
export const getTaskRequirements = (requirements = []) => {
  if (!requirements) return "";

  const requirementLocalization = [
    { name: "subscription", text: "TASK_FROM_SUBSCRIPTION" },
    {
      name: "premium",
      text: "PREMIUM_TASK",
    },
    { name: "cook", text: "REQUIREMENTS_COOKING" },
    { name: "iron", text: "REQUIREMENTS_IRON" },
    {
      name: "bringTools",
      text: "REQUIREMENTS_BRING_TO_TOOLS",
    },
    {
      name: "goMarket",
      text: "GO_MARKET",
    },
    {
      name: "cleaningGlasses",
      text: "CLEANING_GLASSES",
    },
    {
      name: "vacuumingOfficeCarpets",
      text: "VACUUMING_OFFICE_CARPETS",
    },
  ];

  let requirementResult = [];
  requirementResult = requirementLocalization.filter((objectRequire) => {
    return requirements.find((element) => {
      return element === objectRequire?.name;
    });
  });
  return requirementResult;
};

export const formatDate = (date, type = "other") => {
  const locale = getLocaleGlobal() || defaultLocale;
  const typeFormat = {
    date: "DD/MM/YYYY",
    day: "dd",
    time: "HH:mm",
    hour: "HH",
    minute: "mm",
    dateTime: "dddd, DD/MM/YYYY - HH:mm",
    monthYear: "MMMM/YYYY",
    month: "MMMM",
    other: "HH:mm, DD/MM/YYYY",
    weekday: "dddd",
    dateMonth: "DD/MM",
    dateAndWeekday: "dddd, DD/MM",
  };
  return moment(date).locale(locale).format(typeFormat[type]);
};

export const randomCode = (type, length) => {
  // Create promotion code for each of type.
  if (type === "number") {
    const min = 10000000;
    const max = 99999999;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString().substr(1, length);
  }
  if (type === "character") {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(1, length);
  }
  if (type === "both") {
    // return Math.random().toString(36).replace('.', '').substr(1, length);
    return (
      Math.random().toString(36).substring(2, length) + Math.random().toString(36).substring(2, length)
    ).substring(0, length);
  }
};

/**
 * @description format date from now
 * @param date
 * @param locale
 * @example
 * date: 2022-11-22 14:00:00.000+07:00
 * result: 4 days ago
 */
export const formatDateFromNow = (date: Date, locale = defaultLocale) => {
  return moment(date).locale(locale).fromNow();
};

/**
 * @description format money
 * @param number
 * @example
 * number: 100000
 * result: 100,000
 */
export const formatMoney = (number = 0) => {
  return I18n.numberToCurrency(number, {
    delimiter: ",",
    format: "%n",
    precision: 0,
  });
};

// Get payment method
export const getLocalePaymentMethod = (paymentMethod) => {
  if (!paymentMethod) return null;

  if (paymentMethod === CASH) {
    return "TASK_DETAIL.PAYMENT_METHOD_CASH";
  }
  return "TASK_DETAIL.PAYMENT_METHOD_TRANSFER";
};

// Set biến môi trường vào global sau khi xác thực (login, logout, OTP)
export const setVarToGlobal = (params: { userId: string; userToken: string; isoCode?: string; locale?: string }) => {
  setUserIdToGlobal(params.userId);
  setUserTokenToGlobal(params.userToken);
  if (params.isoCode) {
    setIsoCodeToGlobal(params.isoCode);
  }
  if (params.locale) {
    setLocaleToGlobal(params.locale);
  }
};

const checkLocationPermission = async () => {
  const permissionLocation = isAndroid
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  const result = await request(permissionLocation);
  if (result === RESULTS.GRANTED) return true;
  return false;
};

// Get current location
export const getCurrentLocation = async () => {
  const hasLocationPermission = await checkLocationPermission();
  if (!hasLocationPermission) {
    // open setting, enabled gps
    return Alert.alert.open({
      title: "DIALOG.TITLE_INFORMATION",
      message: "CHAT.SERVICE_REQUEST_GPS",
      actions: [
        {
          text: "CHAT.OPEN_SETTINGS",
          onPress: () => {
            if (isIOS) {
              openUrl("app-settings:{1}");
            } else {
              AndroidOpenSettings.locationSourceSettings();
            }
          },
        },
        {
          text: "DIALOG.BUTTON_CLOSE",
          style: "cancel",
        },
      ],
    });
  }
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        Alert.alert.open({
          message: "CHAT.GPS_NOT_FOUND",
          actions: [{ text: "DIALOG.BUTTON_CLOSE" }],
        });
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 2000 }
    );
  });
};

export const openUrl = (url) => {
  if (!url) {
    return;
  }
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export const checkAvatarDefault = (url: string) => {
  if (!url || (url && url === "/avatars/avatarDefault.png")) {
    return true;
  }
  return false;
};

export const formatUrl = (url: string) => {
  if (url && url.match("^https://")) {
    return url;
  }
  if (url && url.match("^http://")) {
    url = url.replace(/^http:\/\//i, "https://");
    return url;
  }
  return url;
};

export const getAvatar = (avatarUrl: string) => {
  if (avatarUrl && !checkAvatarDefault(avatarUrl)) {
    return {
      uri: formatUrl(avatarUrl),
    };
  }
  return require("@src/assets/icons/chat/icon_avatar_default.png");
};

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  if (lat1 === lat2 && lng1 === lng2) {
    return 0;
  } else {
    const R = 6371; // km (change this constant to get miles)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.round(d * 1000);
  }
};

// get list date
export const getRangeWeek = (startDate, limitDate) => {
  const rangeDate = [];
  for (let index = 0; index < limitDate; index++) {
    const temp = moment(startDate).add(index, "days").toDate();
    rangeDate.push(temp);
  }
  return rangeDate;
};

export const getVersionAppName = () => {
  return Config.APP_VERSION_NAME;
};

export const getVersionAppCode = () => {
  return Config.APP_VERSION_CODE;
};

export const getAvgRating = (avgRating: number) => Math.floor(avgRating * 100) / 100;

/**
 * Get data country by isoCode
 * @returns country
 */
export const getCountry = () => {
  return countries.find((e) => e.isoCode === getIsoCodeGlobal());
};

/**
 * @description format money
 * @param mode
 * @example
 * mode: 1
 * result: currency.code
 * mode: 2
 * result: currency.sign
 * default: currency
 */
export const getCurrency = (mode = 0) => {
  const country = getCountry();
  const currency = _.get(country, "currency", {});
  switch (mode) {
    case 1:
      return currency?.code;
    case 2:
      return currency?.sign;
    default:
      return currency;
  }
};

/**
 * @description refactor PhoneNumber with countryCode
 * @param phoneNumber
 * @param countryCode
 * @returns
 * 840987860977
 * 0987860977 if countryCode not exist
 */
export const getUsername = (phoneNumber: string, countryCode: string) => {
  let newCountryCode = "";
  countryCode = String(countryCode);
  let newPhoneNumber = String(phoneNumber);
  if (countryCode) {
    newCountryCode = countryCode.match(/\d+/);
  }
  // remove the fist 0 prefix phone number for viet nam, thai land
  if ((countryCode === "+84" || countryCode === "+66" || countryCode === "+62") && phoneNumber[0] === "0") {
    newPhoneNumber = newPhoneNumber.slice(1);
  }
  return `${newCountryCode}${newPhoneNumber}`;
};

/**
 * @description format working places to list
 * @param districtsSelected
 * @param isoCode
 * @param city
 * @returns
 * [{
    country: isoCode,
    city: city,
    district: item,
  }]
 */
export const formatWorkingPlaces = (
  districtsSelected: Array<any>,
  isoCode: string,
  city: string
) => {
  const workingPlaces = [];
  // Convert
  districtsSelected.forEach((item: string) => {
    const itemWorkingPlace = {
      country: isoCode,
      city: city,
      district: item,
    };
    workingPlaces.push(itemWorkingPlace);
  });
  return workingPlaces;
};

/**
 * @description Kiểm tra tasker có tồn tại trong acceptedTasker hay không
 * @param acceptedTasker
 * @returns Boolean
 */
export const checkMyAcceptedTask = (acceptedTasker: Array<any> = []) => {
  return Boolean(_.find(acceptedTasker, (tasker) => tasker.taskerId === getUserIdGlobal()));
};

export const callSupport = (phoneNumber) => {
  // thao tác ở đây
  openUrl(`tel:${phoneNumber}`);
};

/**
 * @description Viết hoa chữ cái đầu tiền trong chuỗi
 * @param string: thang 11
 * @returns Thang 11
 */
export const capitalizedFirstStr = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * @description get type unit of air conditioner service by HP
 * @param from: number
 * @param to: number
 * @returns String
 */
export const getUnitAirConditionerTextByHP = (from, to, I18n) => {
  if (!from && !to) {
    return I18n.t("TASK_DETAIL.ANY_CAPACITY");
  }
  if (!from && to) {
    return I18n.t("TASK_DETAIL.CAPACITY_LESS_THAN", { t: formatMoney(to) });
  }
  if (from && !to) {
    return I18n.t("TASK_DETAIL.CAPACITY_GREATER_THAN", {
      t: formatMoney(from),
    });
  }
  return I18n.t("TASK_DETAIL.CAPACITY_FROM_TO", {
    t1: formatMoney(from),
    t2: formatMoney(to),
  });
};

/**
 * @description get type unit of air conditioner service by BTU
 * @param from: number
 * @param to: number
 * @returns String
 */
export const getUnitAirConditionerTextByBTU = (from, to, I18n) => {
  if (!from && !to) {
    return I18n.t("TASK_DETAIL.ANY_CAPACITY");
  }
  if (!from && to) {
    return I18n.t("TASK_DETAIL.CAPACITY_LESS_THAN_BTU", { t: formatMoney(to) });
  }
  if (from && !to) {
    return I18n.t("TASK_DETAIL.CAPACITY_GREATER_THAN_BTU", {
      t: formatMoney(from),
    });
  }
  return I18n.t("TASK_DETAIL.CAPACITY_FROM_TO_BTU", {
    t1: formatMoney(from),
    t2: formatMoney(to),
  });
};

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();
// NavigateTo truyền name và params ("Chat",chatId:chatId)
// Hàm điều hướng
export function navigateTo(name?, params?) {
  if (isReadyRef?.current && navigationRef?.current) {
    navigationRef?.current?.navigate(name, params);
  } else {
    //  có thể bỏ qua điều này hoặc thêm các hành động này vào hàng đợi hoặc có thể gọi sau
  }
}
// pop to top
export function popToTop() {
  if (canGoBack()) {
    navigationRef?.current?.dispatch(StackActions.popToTop());
  }
}
// check can go back
export function canGoBack() {
  return navigationRef?.current?.canGoBack();
}
/**
 * Chức Năng:
 * Truyền vào nó cái cục DATA xong sau đó no sẽ gọi tới hàm navigateTo để điều hướng.
 * Ví dụ : navigateTo(notify.navigateTo, { taskId: notify?.taskId });
 * Kết quả trả về LÀ 1 DATA xong sau đó xài props . nó ra từng phần tử của item.
 */
export const handleNotification = (notify: any) => {
  if (_.isEmpty(notify)) {
    return null;
  }
  // Kiểm tra nếu đang ở trong trang đó thì goBack rồi tiếp tục
  if (
    checkRouteExist(notify?.navigateTo) &&
    navigationRef.current.canGoBack()
  ) {
    navigationRef.current.goBack();
  }
  // Thông báo sinh nhật Tasker
  if (
    notify?.title === NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY ||
    notify?.navigateTo === "HappyBirthdayTasker"
  ) {
    return navigateTo("HappyBirthdayTasker", { data: notify });
  }
  // Thông báo vào TaskDetail, Chat,BRewardDetail (Thêm TODO)
  if (notify?.navigateTo === "Chat" && notify?.taskId) {
    return navigateTo(notify?.navigateTo, { taskId: notify?.taskId }); //Navigate tới screen, kèm params
  }
  if (notify?.navigateTo === "Chat" && notify?.chatId) {
    return navigateTo(notify?.navigateTo, { chatId: notify?.chatId }); //Navigate tới screen, kèm params
  }
  if (notify?.navigateTo === "TaskDetail" && notify?.taskId) {
    return navigateTo(notify?.navigateTo, { taskId: notify?.taskId }); //Navigate tới screen, kèm params
  }
  if (notify?.navigateTo === "MonthlyRewardDetail" && notify?.rewardId) {
    return navigateTo(notify?.navigateTo, {
      rewardId: notify?.rewardId,
    }); //Navigate tới screen, kèm params
  }
  if (notify?.navigateTo === "UserBpay") {
    return navigateTo("TransactionHistory"); // Chuyển qua trang lịch sử giao dịch để xem chi tiết tiền
  }
  if (notify?.navigateTo === "RewardDetail" && notify?.rewardId) {
    return navigateTo("BRewardDetail", { rewardId: notify?.rewardId });
  }
  // Get notificationId from remote or inapp
  let notificationId = notify?.notificationId || notify?._id;
  // Không có navigateTo thì vào notificationDetail
  if (
    (!notify?.navigateTo && notificationId) ||
    (notify?.navigateTo === "NotificationDetail" && notificationId)
  ) {
    return navigateTo("NotificationDetail", {
      data: { ...notify, notificationId: notificationId },
    });
  }
  //Thônng báo vào trang bất kỳ
  if (notify?.navigateTo) {
    return navigateTo(notify?.navigateTo, {});
  }
  // Khôgn có navigationTo thì không làm gì
  return null;
};

export const requestStoragePermission = async (I18n: any) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

      {
        title: I18n.t("TOPUP.IMAGE_DOWNLOAD_PERMISSTION"),
        message: I18n.t("TOPUP.IMAGE_DOWNLOAD_PERMISSTION_MESS"),
        buttonNegative: I18n.t("DIALOG.BUTTON_CLOSE"),
        buttonPositive: I18n.t("DIALOG.BUTTON_ACCEPT"),
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Trả về ngày lễ, tết của Việt Name
 * @param date
 * @returns
 */
export const getLunaHoliday = (paramDate: any) => {
  const { date, month } = new LunarDate(moment(paramDate).toDate());
  return NATIONAL_HOLIDAYS.find((d) => d.day === date && d.month === month)?.info || null;
};

/**
 * Trả về ngày âm lịch của ngày truyền vào để hiện thị trên UI Rút gọn text về dạng 01/01
 * Chỉ hiển thị ngày Tết
 * @param date
 * @returns
 */
export const getLunaday = (paramDate: any) => {
  const { date, month } = new LunarDate(moment(paramDate).toDate());
  if (NATIONAL_HOLIDAYS.find((d) => d.day === date && d.month === month)) {
    return `${String(date).padStart(2, "0")}/${String(month).padStart(2, "0")}`;
  }
};

/**
 * @description Get link firebase for car advertising service
 * @param language
 * @param deeplinkSetting
 * @param params
 * @returns
 */
export const getShortLinkFirebase = ({ language, deeplinkSetting, params }) =>
  new Promise((resolve, reject) => {
    const bundleIdAsker = "com.lanterns.btaskee";
    const appStoreIdAsker = "1054302942";
    let socialTitle = "";

    let socialDescription = "";
    let socialImageLink = "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/MohpzxvZfSrHgnmTZ";
    // get from setting system
    if (deeplinkSetting && language) {
      // Check no title
      socialTitle = _.get(deeplinkSetting, `socialTitle[${language}]`, "");
      // get socialTitle by defaultLanguage
      if (!socialTitle && deeplinkSetting.defaultLanguage) {
        socialTitle = _.get(deeplinkSetting, `socialTitle[${deeplinkSetting.defaultLanguage}]`, "");
      }

      socialDescription = _.get(deeplinkSetting, `socialDescription[${language}]`, "");
      if (!socialDescription) {
        // get socialDescription by defaultLanguage
        socialDescription = _.get(deeplinkSetting, `socialDescription[${deeplinkSetting.defaultLanguage}]`, "");
      }
      socialImageLink = _.get(deeplinkSetting, `socialImageLink[${language}]`, "");

      if (!socialImageLink) {
        // get socialImageLink by defaultLanguage
        socialImageLink = _.get(deeplinkSetting, `socialImageLink[${deeplinkSetting.defaultLanguage}]`, "");
      }
    }

    fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Config.ASKER_FIREBASE_API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dynamicLinkInfo: {
          domainUriPrefix: `https://${Config.ASKER_FIREBASE_DEEPLINK_DOMAIN}`,
          link: `https://${Config.ASKER_FIREBASE_DEEPLINK_DOMAIN}/${Config.ASKER_DEEPLINK_LINK_SUFFIX}?${params}`,
          androidInfo: {
            androidPackageName: bundleIdAsker,
            androidFallbackLink: "https://play.google.com/store/apps/details?id=com.lanterns.btaskee",
          },
          iosInfo: {
            iosBundleId: bundleIdAsker,
            iosAppStoreId: appStoreIdAsker,
            iosFallbackLink:
              "https://itunes.apple.com/vn/app/btaskee-vi%E1%BB%87c-nh%C3%A0-theo-gi%E1%BB%9D/id1054302942?mt=8",
          },
          socialMetaTagInfo: {
            socialTitle,
            socialDescription,
            socialImageLink,
          },
          navigationInfo: {
            enableForcedRedirect: "1",
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.shortLink) {
          resolve(responseJson.shortLink);
        } else {
          reject({ error: responseJson });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 *
 * @param taskId string
 * @param user user
 * @param employeeId string
 * @returns
 * success
 * {
 *  status: CONFIRMED | WAITING_ASKER_CONFIRMATION
 * }
 */
export const acceptTask = async (
  taskId: string,
  employeeId?: string,
  callback?: () => void
) => {
  // Tasker thường nhận việc
  const params: IParamAcceptTask = {
    taskerId: getUserIdGlobal(),
    taskId: taskId,
  };
  // Công ty nhận việc (giao việc)
  if (employeeId) {
    params.taskerId = employeeId;
    params.companyId = getUserIdGlobal();
  }
  // Show loading
  await store.dispatch(setLoading(true));
  // Call api accept task
  const result: IRespond = await acceptTaskAPI(params);
  // Hide loading
  await store.dispatch(setLoading(false));
  // Check success
  if (!result.isSuccess) {
    return handleError(result?.error, callback);
  }
  return result?.data;
};

/**
 * @description Check Password the password must have a length between 6 and 12 characters And Password do not have white space
 * @param password: string
 * @returns Boolean: true if invalid
 */
export const checkPassword = (password: any) => {
  // Check white space
  const checkSpace = /\s/g.test(password);
  // Check length
  const isValidLength = password && password.trim().length >= 6 && password.trim().length <= 12;
  return checkSpace || !isValidLength || !password;
};

/**
 * @description Hỏi quyền truy cập notification
 * @returns
 */
const requestNotificationPermission = async () => {
  try {
    if (isIOS) {
      return await messaging().requestPermission();
    }
    const apiLevel = await DeviceInfo.getApiLevel();
    // Hiện thông báo từ Android 13 trở về sau
    if (apiLevel >= 33) {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
        {
          title: "Notification Permission",
          message: "Allow bTaskee Partner to send you notifications?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    }
  } catch (error) {
    return null;
  }
};

/**
 * @description get and send FCM token to server
 * @returns
 */
export const getFCMToken = async () => {
  const DEVICE_TOKEN = "DEVICE_TOKEN";
  const DEVICE_TOKEN_APN = "DEVICE_TOKEN_APN";
  // Xin quyền
  await requestNotificationPermission();

  // Lấy thông tin token
  const tokenInfo = {
    fcmToken: null,
    apnToken: null,
  };
  // get token from AsyncStorage
  let fcmToken = await AsyncStorage.getItem(DEVICE_TOKEN);
  // not exists token
  if (!fcmToken) {
    // get token again and save to AsyncStorage
    fcmToken = await messaging().getToken();
    await AsyncStorage.setItem(DEVICE_TOKEN, fcmToken);
  }
  // exist
  if (fcmToken) {
    tokenInfo.fcmToken = fcmToken;

    if (isAndroid) {
      // set token for CleverTap
      CleverTap.setPushToken(fcmToken, CleverTap.FCM);
    }

    if (isIOS) {
      // Lấy APN token cho IOS
      let apnToken = await AsyncStorage.getItem(DEVICE_TOKEN_APN);
      if (!apnToken) {
        apnToken = await messaging().getAPNSToken();
        await AsyncStorage.setItem(DEVICE_TOKEN_APN, apnToken || "");
      }
      tokenInfo.apnToken = apnToken;
    }
  }
  // Gửi lên server thông tin token
  if (!tokenInfo.apnToken && !tokenInfo.fcmToken) {
    return;
  }
  const device = {
    token: isIOS ? { apn: tokenInfo.apnToken } : { gcm: tokenInfo.fcmToken },
    userId: getUserIdGlobal(),
    appName: "bTaskeePartner",
    metadata: {
      uuid: await DeviceInfo.getUniqueId(),
      platform: Platform.OS,
      version: await DeviceInfo.getSystemVersion(),
      model: await DeviceInfo.getDeviceId(),
      manufacturer: await DeviceInfo.getBrand(),
      appVersion: await getVersionAppName(),
      buildNumber: await getVersionAppCode(),
    },
  };
  if (tokenInfo?.fcmToken) {
    device.metadata.FCMToken = tokenInfo.fcmToken;
    if (isAndroid) {
      // set token for CleverTap
      CleverTap.setPushToken(tokenInfo.fcmToken, CleverTap.FCM);
    }
  }
  sendTokenToServerAPI(device);
};

/**
 * @description Xử lý khi user click vào remote notification
 */
export const subscribeNotificationAction = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
    // Increment the count by 1
    notifee.incrementBadgeCount();
  });

  // IOS
  if (isIOS) {
    // Check whether an initial notification is available, app open
    notifee.getInitialNotification().then((remoteMessage) => {
      if (remoteMessage?.notification?.data) {
        handleNotification(remoteMessage?.notification?.data);
      }
    });

    // Check notification when app open
    notifee.onForegroundEvent(({ type, detail }) => {
      if (detail?.notification?.data) {
        handleNotification(detail?.notification?.data);
      }
    });
    return;
  }
  // Android
  // Check whether an initial notification is available, app open
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage?.data) {
        handleNotification(remoteMessage.data);
      }
    });

  // Check notification when app open
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.data) {
      handleNotification(remoteMessage.data);
    }
  });
};

/*
 * @description Create deeplink share Tasker
 * @param referralCode: string
 * @returns url
 */
export const createShortDynamicLink = async (referralCode: string) =>
  new Promise((resolve, reject) => {
    fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Config.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dynamicLinkInfo: {
          domainUriPrefix: `https://${Config.FIREBASE_DEEPLINK_DOMAIN}`,
          link: `https://${Config.FIREBASE_DEEPLINK_DOMAIN}/${Config.DEEPLINK_LINK_SUFFIX}?${REFERRAL_CODE_PATTERN}${referralCode}`,
          androidInfo: {
            androidPackageName: Config.BUNDLE_ID,
            androidFallbackLink: "https://play.google.com/store/apps/details?id=com.btaskee.partner",
          },
          iosInfo: {
            iosBundleId: Config.BUNDLE_ID,
            iosFallbackLink: "https://itunes.apple.com/vn/app/btaskee-partner/id1201094811",
          },
          socialMetaTagInfo: {
            socialTitle: I18n.t("SHARE_SCREEN.DEEPLINK_TITLE"),
            // socialDescription: I18n.t('DEEPLINK_DESCRIPTION'),
            socialImageLink: "https://btaskee-stag.s3-ap-southeast-1.amazonaws.com/avatars/Wi2hmYDZDAtXG56BR",
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.shortLink) {
          resolve(responseJson.shortLink);
        } else {
          reject({ error: responseJson });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * @description Handle open map. Ưu tiên mở google map -> apple map -> web
 * @param latitude string
 * @param longitude string
 */
export const openMapAsync = async (latitude: string, longitude: string) => {
  // open google map
  const url = Platform.select({
    ios: `comgooglemaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic"`,
    android: `geo://?q=${latitude},${longitude}`,
  });
  Linking.canOpenURL(url).then((canOpen) => {
    if (canOpen) {
      Linking.openURL(url);
    } else if (isIOS) {
      // open apple map
      Linking.openURL(`maps:0,0?q=${latitude},${longitude}`);
    } else {
      // open web
      Linking.openURL(`http://maps.google.com/?q=${latitude},${longitude}`);
    }
  });
};

/**
 * Kiểm tra xem task có thuộc ngày được chọn hay không
 * @param date
 * @param selectDate
 * @returns
 */
export const checkTaskDateWithSelectDate = (selectDate: any, date) => {
  // Nếu thời gian chọn lớn hơn LIMIT_DATE thì hiển thị tất cả các task có thời gian sau LIMIT_DATE
  if (
    moment(selectDate)
      .endOf("day")
      .isAfter(
        moment()
          .add(LIMIT_DATE - 1, "day")
          .endOf("day")
      )
  ) {
    return moment(date).isAfter(
      moment()
        .add(LIMIT_DATE - 1, "day")
        .endOf("day")
    );
  }
  return moment(date).isSame(selectDate, "day");
};

/*
  Reference:
  https://www.movable-type.co.uk/scripts/latlong.html
  https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
*/
export const getDistance = (origin, destination) => {
  // Convert coordinates from degrees to radians
  const degToRad = Math.PI / 180;

  // Calculate distance between two points in latitude and longitude
  const lat1 = origin.lat * degToRad;
  const lat2 = destination.latitude * degToRad;
  const lon1 = origin.lng * degToRad;
  const lon2 = destination.longitude * degToRad;
  const deltaLambda = (lon2 - lon1) * degToRad;
  const R = 6371e3; // gives d in metres

  // Calculate the distance between two points in a spherical surface
  const d =
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(deltaLambda)
    ) * R;

  return Math.round(d);
};
/**
 * Trả về ngày làm việc của task
 * Đối với task Laundry khi chưa nhận đồ sẽ trả về collectionDate
 * @param task
 * @returns
 */
export const getDateOfTask = (task) => {
  // Trường hợp task không phải Laundry
  if (!task?.detail) {
    return task.date;
  }

  // Áp dụng cho trường hợp task Laundry
  if (!task?.detail?.isReceived && task?.collectionDate) {
    return task?.collectionDate;
  }
  return task.date;
};

/**
 * @description Format card number
 * @param text
 * @returns 1111 1111 1111 1111
 */
export const formatCardNumber = (text) => {
  if (!text) return;
  return _.chunk(text.replace(/ /g, ""), 4)
    .map((a) => a.join(""))
    .join(" ");
};

/**
 * @description Kiểm tra xem route có tồn tại hay không
 * @param {*} routeName
 * @param {*} navigation
 * @returns
 */
export const checkRouteExist = (routeName = "") => {
  if (!routeName) {
    return false;
  }
  const routes = navigationRef.current?.getState()?.routes;
  if (routes && routes?.length > 0) {
    const exist = routes.find((route) => {
      return route?.name === routeName;
    });
    return Boolean(exist);
  }
  return false;
};
/**
 * @description Kiểm tra số điện thoại hoặc những từ ngữ không hợp lệ -> chuyển thành
 * @param text string
 * @returns *****
 */
export const replaceInvalidCharacterToString = (text = "") => {
  let newText = "";
  if (text) {
    // find 4 number consecutive [1234, 84 1 , +84]
    newText = text.replace(
      /([0-9]{4,}[0-9])|([0-9]{2,2} [0-9])|(\+[0-9]{2,2})/g,
      "*****"
    );
    // LINE or rude word
    newText = newText.replace(
      /\bline.*id\b|line.*id|ไลน์|อกใหญ่|สาวอกใหญ่|เงี่ยน|เงียน|ควย|เหงา|หี|เยด|เย็ด|เหี้ย|ไอ้|อี|มึง|มัน/gi,
      "*****"
    );
  }
  return newText;
};

/**
 * @description Kiểm tra Global và truyển đúng KEY_PREFIT theo Global đó
 * @param
 * @returns *****
 */

export const getKeyPreFixProfile = () => {
  const components = new Map([
    [VIETNAM, Config.KEY_PREFIX_PROFILE_VN],
    [THAILAND, Config.KEY_PREFIX_PROFILE_TH],
    [INDONESIA, Config.KEY_PREFIX_PROFILE_ID],
  ]);
  return components.get(getIsoCodeGlobal());
};

/**
 * @description Check fontFamily by locale. Use font Kanit for TH, default is Inter
 * @returns fontFamily
 */
export const getFontFamilyByLocale = () => {
  if (getLocaleGlobal() === TH) {
    return fontKanit;
  }
  return fontFamily;
};

/**
 * @description Hiển thị animation hoặc không
 * @returns testing -> true còn lại false
 */
export const checkAnimationDisable = () =>
  Boolean(Config.MODE === modeConfig.testing);

/**
 * @description Format phone number
 * @param number : string (0903727390)
 * @returns string 0903.727.390 || +84 903-727-390
 */
export const formatPhoneNumber = (number: string) => {
  // Remove all non-digit characters from the input
  const cleanedNumber = number.replace(/\D/g, "");
  // Check if the cleaned number is empty
  if (cleanedNumber === "") {
    return "";
  }
  // Format the phone number
  let formattedNumber = "";
  if (cleanedNumber.length === 10) {
    // Format for 10-digit phone numbers: (123) 456-7890
    formattedNumber = cleanedNumber.replace(
      /(\d{4})(\d{3})(\d{3})/,
      "$1.$2.$3"
    );
  } else if (cleanedNumber.length === 11) {
    // Format for 11-digit phone numbers: +84 123-456-7890
    formattedNumber = cleanedNumber.replace(
      /(\d{2})(\d{3})(\d{3})(\d{3})/,
      "+$1 $2-$3-$4"
    );
  } else {
    // Return the cleaned number as is
    formattedNumber = cleanedNumber;
  }
  return formattedNumber;
};

/**
 * Group task by time
 * @param {date} data
 * return array [
 *  { group: 'morning', data: []}
 * ]
 */
export const groupTaskByTime = (data) => {
  //init data
  let newData = [
    {
      group: "MORNING",
      data: [],
      backgroundImage: require("assets/images/task/morning.png"),
      color: "#11A9FF",
    },
    {
      group: "AFTERNOON",
      data: [],
      backgroundImage: require("assets/images/task/afternoon.png"),
      color: "#FF5811",
    },
    {
      group: "EVENING",
      data: [],
      backgroundImage: require("assets/images/task/evening.png"),
      color: "#4F11FF",
    },
  ];
  //group by
  data.forEach((task) => {
    const hour = parseInt(moment(task.date).format("HH"));
    //group by morning <= 12h
    if (hour >= 0 && hour < 12) {
      newData[0].data.push(task);
    } else if (hour >= 12 && hour < 18) {
      //afternoon from 12-18h
      newData[1].data.push(task);
    } else {
      //evening from 18-24h
      newData[2].data.push(task);
    }
  });
  //uniq
  newData = newData.filter((e) => e.data && e.data.length > 0);
  return newData;
};

/**
 * @description Chuyển tiếng việt có dấu thành không dấu
 * @param {*} str chuỗi tiếng việt
 * @returns
 */
export const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str?.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
};

/**
 * @description Viết hoa chữ cái đầu tiên của chuỗi
 * @param {*} string chuỗi
 * @returns
 */
export const upperCaseFirstText = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
