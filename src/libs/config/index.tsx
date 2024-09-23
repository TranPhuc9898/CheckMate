import Config from "react-native-config";

import {
  AIR_CONDITIONER,
  CANCEL_TASK_OTHER_REASON,
  CANCEL_TASK_REASON_NEARBY_TASK_PLACE,
  CANCEL_TASK_REASON_SO_FAR_AWAY,
  CANCEL_TASK_REASON_WRONG_DATE,
  CHILD_CARE,
  CLEANING,
  COUNTRY_CODE_ID,
  COUNTRY_CODE_TH,
  COUNTRY_CODE_VN,
  DEEP_CLEANING,
  DISINFECTION_SERVICE,
  ELDERLY_CARE,
  ELDERLY_CARE_SUBSCRIPTION,
  EN,
  GROCERY_ASSISTANT,
  HOME_COOKING,
  HOUSE_KEEPING,
  ID,
  INDONESIA,
  LAUNDRY,
  MODAL_ALERT_LEVEL_UP,
  MODAL_ALERT_TASK,
  MODAL_ALERT_TIP,
  MODE_DEV,
  MODE_PROD,
  MODE_TESTING,
  OFFICE_CLEANING,
  PATIENT_CARE,
  PAYOUT_STATUS_CANCELED,
  PAYOUT_STATUS_PAID,
  PAYOUT_STATUS_REJECTED,
  PAYOUT_STATUS_WAIT,
  PHONE_SUPPORT_RECRUITMENT_INDONESIA,
  PHONE_SUPPORT_RECRUITMENT_THAILAND,
  PHONE_SUPPORT_RECRUITMENT_VIETNAM,
  STATUS_TASK_CANCELED,
  STATUS_TASK_CONFIRM,
  STATUS_TASK_DONE,
  STATUS_TASK_EXPIRED,
  STATUS_TASK_POSTED,
  STATUS_TASK_WAITING,
  TH,
  THAILAND,
  TYPE_OFFSITE,
  TYPE_ONSITE,
  UPHOLSTERY,
  VI,
  VIETNAM,
  WASHING_MACHINE,
} from "../constants";

export const gender = {
  male: "MALE",
  female: "FEMALE",
};
export const locales: Array<string> = [VI, EN, TH, ID];
export const countryCodes: Array<string> = [COUNTRY_CODE_VN, COUNTRY_CODE_TH, COUNTRY_CODE_ID];
export const isoCodes: Array<string> = [VIETNAM, THAILAND, INDONESIA];

export const countries = [
  {
    name: "vietnam",
    key: "COUNTRY.VIETNAM",
    isoCode: VIETNAM,
    countryCode: COUNTRY_CODE_VN,
    flag: require("@src/assets/images/flag/flag-vietnam.png"),
    currency: {
      sign: "₫",
      code: "VND",
    },
    languageDefault: VI,
  },
  {
    name: "thailand",
    key: "COUNTRY.THAILAND",
    isoCode: THAILAND,
    countryCode: COUNTRY_CODE_TH,
    flag: require("@src/assets/images/flag/flag-thai-land.png"),
    currency: {
      sign: "฿",
      code: "THB",
    },
    languageDefault: TH,
  },
  {
    name: "indonesia",
    key: "COUNTRY.INDONESIA",
    isoCode: INDONESIA,
    countryCode: COUNTRY_CODE_ID,
    flag: require("@src/assets/images/flag/flag-indonesia.png"),
    currency: {
      sign: "Rp",
      code: "IDR",
    },
    languageDefault: ID,
  },
];

export const defaultLocale = EN;

export const durations = [
  { duration: 2, area: "55m²", rooms: "NUMBER_OF_ROOMS" },
  { duration: 3, area: "85m²", rooms: "NUMBER_OF_ROOMS" },
  { duration: 4, area: "105m²", rooms: "NUMBER_OF_ROOMS" },
];

export const services = {
  cleaning: CLEANING,
  airConditioner: AIR_CONDITIONER,
  laundry: LAUNDRY,
  deepCleaning: DEEP_CLEANING,
  homeCooking: HOME_COOKING,
  houseKeeping: HOUSE_KEEPING,
  groceryAssistant: GROCERY_ASSISTANT,
  upholstery: UPHOLSTERY,
  disinfection: DISINFECTION_SERVICE,
  elderlyCare: ELDERLY_CARE,
  patientCare: PATIENT_CARE,
  childCare: CHILD_CARE,
  officeCleaning: OFFICE_CLEANING,
  // cleaningSubscription: CLEANING_SUBSCRIPTION,
  // elderlyCareSubscription: ELDERLY_CARE_SUBSCRIPTION,
  // patientCareSubscription: PATIENT_CARE_SUBSCRIPTION,
  // childCareSubscription: CHILD_CARE_SUBSCRIPTION,
  washingMachine: WASHING_MACHINE,
};

export const statusTask = {
  posted: STATUS_TASK_POSTED,
  waiting: STATUS_TASK_WAITING,
  confirmed: STATUS_TASK_CONFIRM,
  cancel: STATUS_TASK_CANCELED,
  done: STATUS_TASK_DONE,
  expired: STATUS_TASK_EXPIRED,
};

export const reasonsCancel = [
  {
    key: CANCEL_TASK_REASON_NEARBY_TASK_PLACE,
    text: "CANCEL_TASK_REASON_NEARBY_TASK_PLACE",
  },
  {
    key: CANCEL_TASK_REASON_SO_FAR_AWAY,
    text: "CANCEL_TASK_REASON_SO_FAR_AWAY",
  },
  { key: CANCEL_TASK_REASON_WRONG_DATE, text: "CANCEL_TASK_REASON_WRONG_DATE" },
  { key: CANCEL_TASK_OTHER_REASON, text: "CANCEL_TASK_OTHER_REASON" },
];

export const payoutStatus = {
  paid: PAYOUT_STATUS_PAID,
  wait: PAYOUT_STATUS_WAIT,
  canceled: PAYOUT_STATUS_CANCELED,
  rejected: PAYOUT_STATUS_REJECTED,
};

export const listSocial = {
  VN: [
    {
      icon: "facebook",
      name: "Facebook",
      link: "https://www.facebook.com/groups/1211139698915579",
    },
    {
      icon: "youtube",
      name: "Youtube",
      link: "https://www.youtube.com/watch?v=RDDqOERBtqM&list=PLxGAd01yaSvO6fJo_0WviCSrsQhP-dNcp",
    },
    {
      icon: "tiktok",
      name: "Tiktok",
      link: "https://www.tiktok.com/@btaskeepartner",
    },
  ],
  TH: [
    {
      icon: "facebook",
      name: "Facebook",
      link: "https://www.facebook.com/groups/btaskeethailand",
    },
    {
      icon: "youtube",
      name: "Youtube",
      link: "https://www.youtube.com/channel/UCfmPmydxjOik8A7a2eQwGgg",
    },
  ],
  ID: [],
};

export const listHealthcare = {
  VN: [
    {
      name: "HealthCare facebook",
      link: "https://www.facebook.com/groups/btaskeethailand",
    },
    {
      name: "HealthCare youtube",
      link: "https://www.youtube.com/channel/UCfmPmydxjOik8A7a2eQwGgg",
    },
  ],
  TH: [],
  ID: [],
};

export const listBCare = {
  VN: {
    listInsurance: [],
    listHealthcare: [],
  },
  TH: {},
  ID: {},
};

export const typeOfTransaction = {
  D: "+",
  C: "-",
  W: "-",
};

/**
 * Hiển thị ngày âm lịch trong dịp tết
 */
export const NATIONAL_HOLIDAYS = [
  {
    day: 20,
    month: 12,
    info: "20 tết",
  },
  {
    day: 21,
    month: 12,
    info: "21 tết",
  },
  {
    day: 22,
    month: 12,
    info: "22 tết",
  },
  {
    day: 23,
    month: 12,
    info: "23 tết",
  },
  {
    day: 24,
    month: 12,
    info: "24 tết",
  },
  {
    day: 25,
    month: 12,
    info: "25 tết",
  },
  {
    day: 26,
    month: 12,
    info: "26 tết",
  },
  {
    day: 27,
    month: 12,
    info: "27 tết",
  },
  {
    day: 28,
    month: 12,
    info: "28 tết",
  },
  {
    day: 29,
    month: 12,
    info: "29 tết",
  },
  {
    day: 30,
    month: 12,
    info: "30 tết",
  },

  {
    day: 1,
    month: 1,
    info: "Mùng 1 tết",
  },
  {
    day: 2,
    month: 1,
    info: "Mùng 2 tết",
  },
  {
    day: 3,
    month: 1,
    info: "Mùng 3 tết",
  },
  {
    day: 4,
    month: 1,
    info: "Mùng 4 tết",
  },

  {
    day: 5,
    month: 1,
    info: "Mùng 5 tết",
  },
  {
    day: 6,
    month: 1,
    info: "Mùng 6 tết",
  },
  {
    day: 7,
    month: 1,
    info: "Mùng 7 tết",
  },
  {
    day: 8,
    month: 1,
    info: "Mùng 8 tết",
  },
  {
    day: 9,
    month: 1,
    info: "Mùng 9 tết",
  },
  {
    day: 10,
    month: 1,
    info: "Mùng 10 tết",
  },
];

/**
 * @description Show content Tasker rating
 */
export const optionPartnerRating = [
  {
    label: "RATING.ASKER_ONE_STAR_LABEL",
    title: "RATING.ASKER_WHAT_WENT_WRONG",
    option: [
      {
        text: "RATING.ASKER_RATING_BAD_1",
        value: "WORKING_OUTSIDE",
      },
      {
        text: "RATING.ASKER_RATING_BAD_2",
        value: "ENVIRONMENT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_3",
        value: "OVERLOAD",
      },
      {
        text: "RATING.ASKER_RATING_BAD_4",
        value: "CONTACT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_5",
        value: "FRIENDLY",
      },
      {
        text: "RATING.ASKER_RATING_OTHER",
        value: "OTHER",
      },
    ],
  },
  {
    label: "RATING.ASKER_TWO_STAR_LABEL",
    title: "RATING.ASKER_WHAT_WENT_WRONG",
    option: [
      {
        text: "RATING.ASKER_RATING_BAD_1",
        value: "WORKING_OUTSIDE",
      },
      {
        text: "RATING.ASKER_RATING_BAD_2",
        value: "ENVIRONMENT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_3",
        value: "OVERLOAD",
      },
      {
        text: "RATING.ASKER_RATING_BAD_4",
        value: "CONTACT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_5",
        value: "FRIENDLY",
      },
      {
        text: "RATING.ASKER_RATING_OTHER",
        value: "OTHER",
      },
    ],
  },
  {
    label: "RATING.ASKER_THREE_STAR_LABEL",
    title: "RATING.ASKER_WHAT_WENT_WRONG",
    option: [
      {
        text: "RATING.ASKER_RATING_BAD_1",
        value: "WORKING_OUTSIDE",
      },
      {
        text: "RATING.ASKER_RATING_BAD_2",
        value: "ENVIRONMENT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_3",
        value: "OVERLOAD",
      },
      {
        text: "RATING.ASKER_RATING_BAD_4",
        value: "CONTACT",
      },
      {
        text: "RATING.ASKER_RATING_BAD_5",
        value: "FRIENDLY",
      },
      {
        text: "RATING.ASKER_RATING_OTHER",
        value: "OTHER",
      },
    ],
  },
  {
    label: "RATING.ASKER_FOUR_STAR_LABEL",
    title: "RATING.ASKER_WHAT_GOOD",
    option: [
      {
        text: "RATING.ASKER_RATING_GOOD_1",
        value: "WORKING_OUTSIDE",
      },
      {
        text: "RATING.ASKER_RATING_GOOD_2",
        value: "ENVIRONMENT",
      },
      {
        text: "RATING.ASKER_RATING_GOOD_3",
        value: "OVERLOAD",
      },
      {
        text: "RATING.ASKER_RATING_GOOD_4",
        value: "CONTACT",
      },
      {
        text: "RATING.ASKER_RATING_GOOD_5",
        value: "FRIENDLY",
      },
      {
        text: "RATING.ASKER_RATING_OTHER",
        value: "OTHER",
      },
    ],
  },
  {
    label: "RATING.ASKER_FIVE_STAR_LABEL",
    title: "RATING.ASKER_WHAT_GOOD",
    option: [
      {
        text: "RATING.FRIENDLY",
        value: "FRIENDLY",
      },
      {
        text: "RATING.POLITE",
        value: "POLITE",
      },
      {
        text: "RATING.CHEERFUL",
        value: "CHEERFUL",
      },
      {
        text: "RATING.SUPPORT",
        value: "SUPPORT",
      },
    ],
  },
];

export const listAccessApiKey = {
  VN: Config.ACCESS_API_KEY_VN,
  TH: Config.ACCESS_API_KEY_TH,
  ID: Config.ACCESS_API_KEY_ID,
};

export const webSocketEnpointKey = {
  VN: `?accessKey=${listAccessApiKey[VIETNAM]}`,
  TH: `?accessKey=${listAccessApiKey[THAILAND]}`,
  ID: `?accessKey=${listAccessApiKey[INDONESIA]}`,
};
/**
 * @description mode type in file dev.env
 */
export const modeConfig = {
  dev: MODE_DEV,
  prod: MODE_PROD,
  testing: MODE_TESTING,
};

/**
 * @description list placeholder by country
 */
export const placeholderMoney = new Map([
  [VIETNAM, "1.000.000₫"],
  [THAILAND, "1.000฿"],
  [INDONESIA, "Rp 1.000"],
]);

/**
 * @description Type of curtain in Sofa TH
 */
export const typeCurtainSofa = {
  onSite: TYPE_ONSITE,
  offSite: TYPE_OFFSITE,
};

/**
 * @description Type of modal websocket
 */
export const typeModalWebSocket = {
  task: MODAL_ALERT_TASK,
  tip: MODAL_ALERT_TIP,
  levelUp: MODAL_ALERT_LEVEL_UP,
};

/**
 * @description List type of modal call api notification
 */
export const listTypeShowModalAlert = [MODAL_ALERT_LEVEL_UP, MODAL_ALERT_TIP];

/**
 * @description Phone support recruitment default
 */
export const phoneSupportRecruitment = {
  VN: PHONE_SUPPORT_RECRUITMENT_VIETNAM,
  TH: PHONE_SUPPORT_RECRUITMENT_THAILAND,
  ID: PHONE_SUPPORT_RECRUITMENT_INDONESIA,
};

export const weatherImages = {
  "Partly cloudy": {
    image: require("@images/weather/partlycloudy.png"),
    text: "WEATHER.PARTLY_CLOUDY",
  },
  "Moderate rain": {
    image: require("@images/weather/moderaterain.png"),
    text: "WEATHER.MODERATE_RAIN",
  },
  "Patchy rain possible": {
    image: require("@images/weather/moderaterain.png"),
    text: "WEATHER.PATCHY_RAIN_POSSIBLE",
  },
  Sunny: {
    image: require("@images/weather/sun.png"),
    text: "WEATHER.SUNNY",
  },
  Clear: {
    image: require("@images/weather/sun.png"),
    text: "WEATHER.CLEAR",
  },
  Overcast: {
    image: require("@images/weather/cloud.png"),
    text: "WEATHER.OVERCAST",
  },
  Cloudy: {
    image: require("@images/weather/cloud.png"),
    text: "WEATHER.CLOUDY",
  },
  "Light rain": {
    image: require("@images/weather/moderaterain.png"),
    text: "WEATHER.LIGHT_RAIN",
  },
  "Moderate rain at times": {
    image: require("@images/weather/moderaterain.png"),
    text: "WEATHER.MODERATE_RAIN_AT_TIME",
  },
  "Heavy rain": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.HEAVY_RAIN",
  },

  "Heavy rain at times": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.HEAVY_RAIN_AT_TIME",
  },
  "Moderate or heavy freezing rain": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.MODERATE_OR_HEAVY_FREEZING_RAIN",
  },
  "Moderate or heavy rain shower": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.MODERATE_OR_HEAVY_RAIN_SHOWER",
  },
  "Moderate or heavy rain with thunder": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.MODERATE_OR_HEAVY_RAIN_WITH_THUNDER",
  },
  Mist: {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.MIST",
  },
  other: {
    image: require("@images/weather/moderaterain.png"),
    text: "WEATHER.OTHER",
  },
  "Patchy rain nearby": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.PATCHY_RAIN_NEARBY",
  },
  "Patchy snow nearby": {
    image: require("@images/weather/cloud.png"),
    text: "WEATHER.PATCHY_SNOW_NEARBY",
  },
  "Patchy sleet nearby": {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.PATCHY_SLEET_NEARBY",
  },
  "Patchy freezing drizzle nearby": {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.PATCHY_FREEZING_DRIZZLE_NEARBY",
  },
  "Thundery outbreaks in nearby": {
    image: require("@images/weather/heavyrain.png"),
    text: "WEATHER.THUNDERY_OUTBREAKS_IN_NEARBY",
  },
  Fog: {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.FOG",
  },
  "Freezing fog": {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.FREEZING_FOG",
  },
  "Patchy light drizzle": {
    image: require("@images/weather/mist.png"),
    text: "WEATHER.PATCHY_LIGHT_DRIZZLE",
  },
};
