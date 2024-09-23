/**
 * @Filename: libs/tracking/track-clever-tap.tsx
 * @Description: Tracking the events of CleverTap
 * @CreatedAt: 15/02/2023
 * @Author: Toan Huu
 * @UpdatedAt: 15/02/2023
 * @UpdatedBy: Toan Huu
 **/

import _ from "lodash";
import moment from "moment";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";
import { checkAnimationDisable, getCountry } from "libs/helper";

// get manufacturer
let manuFacturerDevice = null;
DeviceInfo.getManufacturer().then((manufacturer) => {
  manuFacturerDevice = manufacturer;
});

// import CleverTap
const CleverTap = require("clevertap-react-native");

/**
 * @description refactor PhoneNumber with countryCode
 * @param phoneNumber
 * @param countryCode
 * @returns
 * +840987860977
 * 0987860977 if countryCode not exist
 */
export const refactorPhoneNumber = (phoneNumber, countryCode) => {
  const customCountryCode = String(countryCode);
  let newPhoneNumber = String(phoneNumber);
  // remove the fist 0 prefix phone number for viet nam, thai land
  if (phoneNumber[0] === "0") {
    newPhoneNumber = newPhoneNumber.slice(1);
  }
  return `${customCountryCode}${newPhoneNumber}`;
};

export const updateUserCleverTap = async (dataUser) => {
  if (Config.MODE === "dev") return null;
  if (!dataUser?._id) {
    return null;
  }
  const country = getCountry();
  const phone = _.get(dataUser, "phone", null);
  const countryCode = _.get(dataUser, "countryCode", null);
  const language = _.get(dataUser, "language", "");
  const isPremiumTasker = _.get(dataUser, "isPremiumTasker", false);

  let dataProfile = {
    UUID: await DeviceInfo.getUniqueId(),
    UserId: dataUser?._id,
    Identity: dataUser?._id,
    Name: _.get(dataUser, "name", null),
    Phone: refactorPhoneNumber(phone, countryCode),
    Photo: _.get(dataUser, "avatar", null),
    Address: _.get(dataUser, "address", null),
    Platform: Platform.OS,
    AppVersion: Config.APP_VERSION_NAME,
    City: _.get(dataUser, "city", null),
    Country: country?.name,
    Language: language,
    Status: dataUser?.status,
    Rating: dataUser?.avgRating,
    "Total task done": _.get(dataUser, "taskDone", 0),
    "Premium account": isPremiumTasker,
    "MSG-email": true,
    "MSG-push": true,
    "MSG-sms": true,
    "Acquistion type": "Mobile app",
  };
  try {
    let cloneParams = _.cloneDeep(dataProfile);
    let customParams: any = {};
    Object.keys(cloneParams).forEach(function (key) {
      if (cloneParams[key]) {
        customParams[key] = cloneParams[key];
      }
    });
    CleverTap.enablePersonalization();
    CleverTap.profileGetProperty("Identity", (err, res) => {
      if (err) {
        return null;
      }
      if (res && res === customParams.Identity) {
        return CleverTap.profileSet(customParams);
      }
      return CleverTap.onUserLogin(customParams);
    });
  } catch (e) {}
};

/**
 * Add event to CleverTap
 * @param nameEvent String - Name of the event
 * @param params Object - Params need tracking
 */
const trackEventCleverTap = (nameEvent, params = {}) => {
  // tracking even can not run detox test
  if (Config.MODE === "dev") return null;

  let cloneParams = _.cloneDeep(params);
  let customParams = {};

  // Discard the empty params
  Object.keys(cloneParams).forEach(function (key) {
    if (cloneParams[key]) {
      customParams[key] = cloneParams[key];
    }
  });
  try {
    // Add event
    CleverTap.recordEvent(nameEvent, customParams);
  } catch (e) {}
};

/**
 * tracking event view task
 * @param serviceName
 * @param addressTask
 * @param duration
 * @param date
 * @param promotionCode
 * @param taskValue
 * @param isSubscription
 * @param isSchedule
 * @param premium
 */
export const trackingViewTask = (dataTask) => {
  const {
    serviceName,
    address,
    duration,
    cost,
    subscriptionId,
    scheduleId,
    isPremium,
    promotion,
    date,
  } = dataTask;

  const params = {
    serviceName,
    address,
    duration,
    taskValue: cost,
    subscription: subscriptionId ? true : false,
    schedule: scheduleId ? true : false,
    premium: isPremium ? true : false,
    promotionCode: promotion?.code,
    date: date ? `$D_${moment(date).unix()}` : null,
  };
  return trackEventCleverTap("mk_view_task", { ...params });
};

/**
 * tracking event screen view
 * @param screenName String - Screen's name
 */
export const trackingCleverTapScreenView = (screenName: string) => {
  const params = {
    screenName: screenName,
  };
  return trackEventCleverTap("mk_screen_view", { ...params });
};

/**
 * tracking event view chat
 * @param serviceName
 * @param premium
 * @param sendMessage
 */
export const trackingViewChat = (params: any) => {
  return trackEventCleverTap("mk_view_chat", params);
};

/**
 * tracking event view chat
 * @param referralCode
 * @param phone
 * @param shareWith
 */
export const trackingClickShareReferral = (params: any) => {
  return trackEventCleverTap("button_share_refrral_clicked", params);
};

/**
 * Event được ghi nhận sau khi user login thành công
 * @param phone
 */
export const trackingLoginSuccess = (phone: string) => {
  const params = {
    phone: phone,
  };
  return trackEventCleverTap("mk_login_success", params);
};

/**
 * Event được ghi nhận sau khi user tạo tài khoản thành công
 * @param phone
 * @param name
 * @param referralCode
 */
export const trackingRegisterSuccess = (params: {
  phone: string;
  name: string;
  referralCode: string;
}) => {
  return trackEventCleverTap("mk_register_success", params);
};
