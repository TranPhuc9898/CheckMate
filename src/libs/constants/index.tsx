/**
 * Nơi khái báo các hằng số của app
 */

// Biến môi trường toàn cục global
export const G_USER_ID = "userId";
export const G_LOCALE = "locale";
export const G_USER_TOKEN = "userToken";
export const G_ISO_CODE = "isoCode";
// End global

// Biến quốc gia
export const VIETNAM = "VN";
export const THAILAND = "TH";
export const INDONESIA = "ID";

// Biến ngôn ngữ
export const VI = "vi";
export const EN = "en";
export const TH = "th";
export const ID = "id";

// Biến sdt theo quốc gia
export const COUNTRY_CODE_VN = "+84";
export const COUNTRY_CODE_TH = "+66";
export const COUNTRY_CODE_ID = "+62";

// Màu app
export const PRIMARY0_COLOR = "#4250af";
export const PRIMARY3_COLOR = "#D1D4E7";
export const PRIMARY2_COLOR = "#9CA3D2";
export const PRIMARY1_COLOR = "#6671BD";
export const SECONDARY_COLOR = "#FF7070";
export const SECONDARY_COLOR_1 = "#FD8B8B";
export const SECONDARY_COLOR_2 = "#F9AFAE";
export const SECONDARY_COLOR_3 = "#F7DADA";
export const BACKGROUND_COLOR = "#ffffff";
export const BACKGROUND_COLOR_GREY = "#f2f2f2";
export const BLACK_COLOR = "#000000";
export const BLACK_COLOR_1 = "#333333";
export const WHITE_COLOR = "#ffffff";
export const GREY0_COLOR = "#313131";
export const GREY1_COLOR = "#7B7B7B";
export const GREY2_COLOR = "#B9B9B9";
export const GREY3_COLOR = "#C4C4C4";
export const GREY4_COLOR = "#D3D3D3";
export const GREY5_COLOR = "#EEEEEE";
export const GREY6_COLOR = "#E3E6E8";
export const DISABLED_COLOR = "rgb(227, 230, 232)";
export const SUCCESS_COLOR = "rgb(82, 196, 26)";
export const ERROR_COLOR = "rgb(255, 25, 12)";
export const WARNING_COLOR = "rgb(250, 173, 20)";
// Màu CHAT
export const CHAT_LEFT_COLOR = "#FFE2E2";
export const CHAT_RIGHT_COLOR = "#D9DCEF";
// Spacing
export const SPACING_S = 5;
export const SPACING_M = 10;
export const SPACING_L = 15;
export const SPACING_XL = 20;
export const SPACING_XXL = 25;
export const SPACING_XXXL = 30;

// font size
export const FONT_SIZE_S = 10;
export const FONT_SIZE_M = 14;
export const FONT_SIZE_L = 16;
export const FONT_SIZE_XL = 20;
export const FONT_SIZE_XXL = 25;
export const FONT_SIZE_XXXL = 32;

// Side button
export const BUTTON_SM = 32;
export const BUTTON_MD = 36;
export const BUTTON_LG = 56;

// Custom font style
export const FONT_INTER_BOLD = "inter-bold";
export const FONT_INTER_NORMAL = "inter";
export const FONT_INTER_LIGHT = "inter-light";
export const FONT_KANIT_BOLD = "Kanit-Bold";
export const FONT_KANIT_LIGHT = "Kanit-Light";
export const FONT_KANIT_NORMAL = "Kanit-Light";

// Custom font weight
export const FONT_WEIGHT_S = "400";
export const FONT_WEIGHT_M = "500";
export const FONT_WEIGHT_L = "600";
export const FONT_WEIGHT_XL = "700";
// border radius
export const BORDER_RADIUS_XS = 8;
export const BORDER_RADIUS_S = 15;
export const BORDER_RADIUS_L = 50;

export const STATUS_TASK_POSTED = "POSTED";
export const STATUS_TASK_CANCELED = "CANCELED";
export const STATUS_TASK_DONE = "DONE";
export const STATUS_TASK_EXPIRED = "EXPIRED";
export const STATUS_TASK_WAITING = "WAITING_ASKER_CONFIRMATION";
export const STATUS_TASK_CONFIRM = "CONFIRMED";

// Service
export const CLEANING = "CLEANING";
export const CLEANING_SUBSCRIPTION = "CLEANING_SUBSCRIPTION";
export const AIR_CONDITIONER = "AIR_CONDITIONER_SERVICE";
export const LAUNDRY = "LAUNDRY";
export const DEEP_CLEANING = "DEEP_CLEANING";
export const HOME_COOKING = "HOME_COOKING";
export const HOUSE_KEEPING = "HOUSE_KEEPING";
export const GROCERY_ASSISTANT = "GO_MARKET";
export const UPHOLSTERY = "SofaCleaning";
export const DISINFECTION_SERVICE = "DISINFECTION_SERVICE";
export const SOFA = "SofaCleaning";
export const ELDERLY_CARE = "ELDERLY_CARE";
export const PATIENT_CARE = "PATIENT_CARE";
export const GROCERY_ASSISTANT_OLD = "GO_MARKET_OLD";
export const ELDERLY_CARE_SUBSCRIPTION = "ELDERLY_CARE_SUBSCRIPTION";
export const PATIENT_CARE_SUBSCRIPTION = "PATIENT_CARE_SUBSCRIPTION";
export const CHILD_CARE = "CHILD_CARE";
export const CHILD_CARE_SUBSCRIPTION = "CHILD_CARE_SUBSCRIPTION";
export const OFFICE_CLEANING = "OFFICE_CLEANING";
export const WASHING_MACHINE = "WASHING_MACHINE";

export const CASH = "CASH";
export const TRANSFER = "TRANSFER";

export const LIMIT_DATE = 7;
export const LIMIT_DATE_OF_CACHE_TASK_CONFIRMED = 3;
export const HEIGHT_BUTTON = 40;

export const CANCEL_TASK_REASON_NEARBY_TASK_PLACE = "NEARBY_TASK_PLACE";
export const CANCEL_TASK_REASON_SO_FAR_AWAY = "SO_FAR_AWAY";
export const CANCEL_TASK_REASON_WRONG_DATE = "WRONG_DATE";
export const CANCEL_TASK_OTHER_REASON = "OTHER_REASON";

// Chat
export const TASKER = "TASKER";
export const ASKER = "ASKER";

export const PAYOUT_STATUS_WAIT = "WAIT";
export const PAYOUT_STATUS_PAID = "PAID";
export const PAYOUT_STATUS_CANCELED = "CANCELED";
export const PAYOUT_STATUS_REJECTED = "REJECTED";

// Status of Tasker
/**
 * Chưa kích hoạt tài khoản bằng OTP
 */
export const USER_STATUS_INACTIVE = "INACTIVE";
/**
 * Đã nhập OTP nhưng cần chờ team Tasker kích hoạt
 */
export const USER_STATUS_UNVERIFIED = "UNVERIFIED";
/**
 * Đã hoạt động, có thể nhận việc
 */
export const USER_STATUS_ACTIVE = "ACTIVE";
/**
 * Tài khoản bị khóa
 */
export const USER_STATUS_LOCKED = "LOCKED";
/**
 * Tasker thử việc, khi Tasker làm được xx công việc thì tự động được Active
 */
export const USER_STATUS_IN_PROBATION = "IN_PROBATION";

// Status of check input
/**
 * Đã làm xong và đậu bài test
 */
export const CHECK_INPUT_STATUS_TASKER_PASS = "TASKER_PASS";

// Status of quiz
export const QUIZ_STATUS_PASSED = "PASS";
export const QUIZ_STATUS_FAILED = "FAILED";

// SOCIAL_BTASKEE
export const LINK_SUPPORT_LINE_THAI = "https://lin.ee/61Yvn6D";
export const LINK_SUPPORT_LINE_THAI_RECRUITMENT = "https://lin.ee/zVaRzRL";
export const LINK_SUPPORT_ZALO = "https://zalo.me/784043022254331849";
export const LINK_SUPPORT_FACEBOOK_RECRUITMENT_VN = "https://www.facebook.com/giupviecnhabtaskee";

// ERROR_RESEND_PASSWORD
export const MAX_SMS_RESEND_ACTIVATION = "MAX_SMS_RESEND_ACTIVATION";

/**
 * Key notify birthday
 */
export const NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY = "HAPPY_BIRTHDAY_NOTIFICATION_CONTENT";

// Filter new task
export const FILTER_NY_CREATED_AT = "CREATED_AT_DECREASE";

// Type transaction
export const TRANSACTION_TYPE_D = "D";
export const TRANSACTION_TYPE_C = "C";

// MODE environment
export const MODE_DEV = "dev";
export const MODE_PROD = "prod";
export const MODE_TESTING = "testing";

// Key Async Storage
export const CACHE_TASK_CONFIRMED = "CACHE_TASK_CONFIRMED";

// Name modal alert
export const MODAL_ALERT_TIP = "TIP";
export const MODAL_ALERT_TASK = "TASK";
export const MODAL_ALERT_LEVEL_UP = "LEVEL_UP";

// Phone support Thailand
export const PHONE_SUPPORT_THAILAND = "021146111";

// Phone support recruitment
export const PHONE_SUPPORT_RECRUITMENT_VIETNAM = "0795048802";
export const PHONE_SUPPORT_RECRUITMENT_THAILAND = "021146111";
export const PHONE_SUPPORT_RECRUITMENT_INDONESIA = null;

// Traninging program
export const TRAINING_PROGRAM_PERMISSON_OPEN = "OPEN";
export const TRAINING_PROGRAM_PERMISSON_LOCK = "LOCK";
export const TRAINING_PROGRAM_STATUS_PASS = "PASS";
export const TRAINING_PROGRAM_STATUS_FAILED = "FAILED";

// Tab Benefit
export const BENEFIT_COMMUNITY = "community";
export const BENEFIT_BCARE = "bCare";
export const BENEFIT_TRAINING_PREMIUM = "trainingPremium";
export const BENEFIT_BREWARD = "bReward";
export const BENEFIT_TRAINING_PROGRAM = "trainingProgram";
export const BENEFIT_MONTHLY_REWARD = "monthlyReward";

/**
 * Type of curtain in Sofa TH
 */
export const TYPE_ONSITE = "onSite";
export const TYPE_OFFSITE = "offSite";

// Currency bPoint
export const BPOINT = "bPoint";

// Coming soon error
export const COMING_SOON = "COMING_SOON";

// URL Journey
export const JOURNEY_URL_VN = "https://www.btaskee.com/kinh-nghiem-hay/cong-dong-btasker/journey-for-tasker-vietnam/";
export const JOURNEY_URL_TH = "https://www.btaskee.com/th/blog/for-tasker/journey-for-tasker-thailand/";
export const DAY_OF_WEEK = 7;
