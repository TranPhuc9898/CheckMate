/* Nơi khai báo điều hướng trang cho ứng dụng

1. loginStack là những trang chưa có đăng nhập
2. homeStack là những trang chỉ sau khi đăng nhập mới có thể sử dụng
 */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import BRewardScreen from "screens/bReward";
import bPointsHistory from "screens/bReward/bPoints-history";

import ForgotPassword from "@src/screens/forgot-password";
import Login from "@src/screens/login";
import OTP from "@src/screens/otp";
import Register from "@src/screens/register";
import ChooseCountry from "screens/choose-country";

import Chat from "@src/screens/chat/";
import Notification from "screens/tab-notification";
import bRewardDetail from "screens/bReward/bReward-detail";
import MemberInfo from "screens/bReward/bReward-member-infor";
import bRewardSearch from "screens/bReward/bReward-search";
import ListReward from "screens/bReward/layout/list-reward";
import MyGift from "screens/bReward/my-reward";
import GiftDetailScreen from "screens/bReward/my-reward/gift-detail";
import ChangePassword from "screens/change-password";
import AboutBTaskeeScreen from "screens/choose-country/layout/about-bTaskee";
import IntroApp from "screens/choose-country/layout/intro-page";
import SignUpAndLoginScreen from "screens/choose-country/layout/sign-up-and-login";
import CommunityScreen from "screens/community";
import FAQFinanceScreen from "screens/faq-finance";
import HappyBirthdayTasker from "screens/happy-birthday";
import ListOfToolForTasker from "screens/list-tool-for-tasker";
import MonthlyRewardDetail from "screens/monthly-reward";
import RatingAskerScreen from "screens/rating";
import ReferralScreen from "screens/register/component/referral";
import SetPassword from "screens/set-password";
import SupplementProfile from "screens/supplement-profile";
import UploadImageCertificate from "screens/supplement-profile/screens/certificate-conduct/image-certificate";
import CertificateConduct from "screens/supplement-profile/screens/certificate-conduct/layout";
import UploadImageCurriculum from "screens/supplement-profile/screens/curriculum-vitae/image-curriculum";
import CurriculumVitae from "screens/supplement-profile/screens/curriculum-vitae/layout";
import UpdateImageHouseHold from "screens/supplement-profile/screens/house-hold/image-house-hold";
import HouseHold from "screens/supplement-profile/screens/house-hold/layout";
import ChooseDateTimeAppointment from "screens/supplement-profile/screens/make-appointment/choose-date-time";
import ChoosePlaceAppointment from "screens/supplement-profile/screens/make-appointment/choose-place";
import UploadImageProfile from "screens/supplement-profile/screens/upload-profile/image-profile";
import UploadProfile from "screens/supplement-profile/screens/upload-profile/layout";
import ShareScreen from "screens/tab-account/account/components/share";
import NotificationDetail from "screens/tab-notification/notification-detail";
import EmployeeDetail from "screens/tab-account/employee-detail";
import Finance from "screens/tab-account/finance";
import KitsAndChemicals from "screens/tab-account/get-kits-and-chemicals";
import KitsAndChemicalsDetail from "screens/tab-account/get-kits-and-chemicals/components/getkitsandchemicals-detail";
import IncomeDetail from "screens/tab-account/income-detail";
import JourneyAndLeaderBoard from "screens/tab-account/journey";
import CalculateScoreLeaderBoard from "screens/tab-account/journey/screens/calculate-score";
import ListEmployee from "screens/tab-account/list-employee";
import Profile from "screens/tab-account/personal-profile";
import PremiumDetail from "screens/tab-account/premium-detail";
import SettingsDetail from "screens/tab-account/settings-detail";
import DeleteAccountScreen from "screens/tab-account/settings-detail/components/delele-account/components/delete-account-policy";
import SupportScreen from "screens/tab-account/support/";
import Topup from "screens/tab-account/top-up";
import TopupDetail from "screens/tab-account/top-up-detail";
import TransactionHistory from "screens/tab-account/transaction-history";
import WeeklyReport from "screens/tab-account/weekly-report";
import Withdraw from "screens/tab-account/withdraw";
import MonthlyRewardDetailBenefit from "screens/tab-benefit/layout/monthly-reward/components/monthly-reward-detail";
import ConfirmCollectedClothes from "screens/tab-laundry/layout/confirm-collected-clothes";
import TaskDetail from "screens/task-detail";
import AssignedToEmployees from "screens/task-detail/layout/assigned-to-employees";
import BCareDetail from "screens/task-detail/layout/components/bCare/bCare-detail";
import HostelDetail from "screens/task-detail/layout/components/duration-and-type-house/room-detail";
import TrainingPremium from "screens/training-premium-tasker";
import TrainingProgramDetail from "screens/training-program/detail";
import TrainingProgramList from "screens/training-program/list";
import TrainingProgramQuiz from "screens/training-program/quiz";
import TrainingProgramVideo from "screens/training-program/quiz-with-video";
import WeatherScreen from "screens/weather";
import WebviewDetail from "screens/webview";

import HomeTab from "./home-tab";
import TrainingInput from "screens/training-input-tasker";
import RewardStore from "screens/bReward/bReward-detail/bReward-store/bReward-store-detail";

interface Stack {
  name: string;
  title: string;
  component?: any;
  options?: NativeStackNavigationOptions;
}

export const loginStack: Array<Stack> = [
  {
    name: "Login",
    title: "LOGIN.TITLE_LOGIN",
    component: Login,
    options: { headerShown: false },
  },
  { name: "Register", title: "REGISTER.TITLE_REGISTER", component: Register },
  {
    name: "OTP",
    title: "OTP.TITLE",
    component: OTP,
  },
  {
    name: "ForgotPassword",
    title: "FORGOT_PASSWORD.TITLE",
    component: ForgotPassword,
  },
  {
    name: "SetPassword",
    title: "SET_PASSWORD.TITLE",
    component: SetPassword,
  },
  {
    name: "Registration",
    title: "REGISTER.TITLE_REGISTER",
    component: SignUpAndLoginScreen,
  },
  {
    name: "AboutBTaskee",
    title: "ABOUT_BTASKEE.TITLE",
    component: AboutBTaskeeScreen,
  },
  {
    name: "ChooseCountry",
    title: "",
    component: ChooseCountry,
    options: {
      headerShown: false,
    },
  },
  {
    name: "IntroApp",
    title: "INTRO_APP.TITLE",
    component: IntroApp,
  },
  {
    name: "ReferralScreen",
    title: "TAB_ACCOUNT.TITLE_CARD_SHARE",
    component: ReferralScreen,
  },
];

export const homeStack: Array<Stack> = [
  {
    name: "Home",
    title: "Home",
    component: HomeTab,
    options: { headerShown: false },
  },
  {
    name: "Chat",
    title: "CHAT.TITLE",
    component: Chat,
    options: { headerShown: false },
  },
  {
    name: "TaskDetail",
    title: "TASK_DETAIL.TITLE",
    component: TaskDetail,
    options: { gestureEnabled: false },
  },
  {
    name: "Notification",
    title: "NOTIFICATION_SYSTEM.INBOX",
    component: Notification,
  },
  {
    name: "NotificationDetail",
    title: "NOTIFICATION.NOTIFICATION_DETAIL",
    component: NotificationDetail,
  },
  { name: "Profile", title: "TAB_ACCOUNT.PROFILE", component: Profile },
  {
    name: "Finance",
    title: "TAB_ACCOUNT.FINANCE",
    component: Finance,
    options: { headerShown: false },
  },
  { name: "Withdraw", title: "TAB_ACCOUNT.WITHDRAW", component: Withdraw },
  { name: "Topup", title: "TAB_ACCOUNT.TOPUP", component: Topup },
  { name: "TopupDetail", title: "TAB_ACCOUNT.TOPUP", component: TopupDetail },
  {
    name: "TransactionHistory",
    title: "TAB_ACCOUNT.TRANSACTION_HISTORY",
    component: TransactionHistory,
  },
  {
    name: "KitsAndChemicals",
    title: "KIT_CHEMICALS.TITLE",
    component: KitsAndChemicals,
  },
  {
    name: "KitsAndChemicalsDetail",
    title: "KIT_CHEMICALS.GET_KITS_AND_CHEMICALS_DETAIL",
    component: KitsAndChemicalsDetail,
    // options: { headerShown: false },
  },

  {
    name: "WeeklyReport",
    title: "TAB_ACCOUNT.WEEKLY_REPORT",
    component: WeeklyReport,
  },
  {
    name: "IncomeDetail",
    title: "TAB_ACCOUNT.HISTORY_INCOME",
    component: IncomeDetail,
  },
  { name: "WebviewDetail", title: "", component: WebviewDetail },
  {
    name: "SettingsDetail",
    title: "SETTINGS.SETTINGS",
    component: SettingsDetail,
    // options:{ headerShown: false }
  },
  {
    name: "HostelDetail",
    title: "TASK_DETAIL.HOSTEL_DETAIL",
    component: HostelDetail,
  },
  {
    name: "ListEmployee",
    title: "TAB_ACCOUNT.LIST_OF_EMPLOYEE",
    component: ListEmployee,
  },
  {
    name: "EmployeeDetail",
    title: "TAB_ACCOUNT.LIST_OF_EMPLOYEE",
    component: EmployeeDetail,
  },
  {
    name: "BReward",
    title: "TAB_BENEFIT.BREWARD",
    component: BRewardScreen,
    options: { headerShown: false },
  },
  {
    name: "BRewardDetail",
    title: "TAB_BENEFIT.BREWARD_DETAIL",
    component: bRewardDetail,
  },
  {
    name: "bRewardSearch",
    title: "TAB_BENEFIT.SEARCH",
    component: bRewardSearch,
    options: { headerShown: false },
  },
  {
    name: "ListReward",
    title: "",
    component: ListReward,
    options: { headerShown: false },
  },
  {
    name: "MyGift",
    title: "TAB_BENEFIT.MY_GIFT",
    component: MyGift,
    options: { headerShown: false },
  },
  {
    name: "MemberInfo",
    title: "MEMBER_INFO.TITLE",
    component: MemberInfo,
    options: { headerShown: false },
  },
  {
    name: "bPointsHistory",
    title: "MEMBER_INFO.BPOINT_HISTORY",
    component: bPointsHistory,
    options: { headerShown: false },
  },
  {
    name: "GiftDetail",
    title: "TAB_BENEFIT.BREWARD_DETAIL",
    component: GiftDetailScreen,
  },
  {
    name: "AssignedToEmployees",
    title: "TAB_ACCOUNT.LIST_OF_EMPLOYEE",
    component: AssignedToEmployees,
  },
  {
    name: "MonthlyRewardDetail",
    title: "MONTHLY_REWARD.TITLE",
    component: MonthlyRewardDetail,
  },
  {
    name: "ChangePassword",
    title: "CHANGE_PASSWORD.TITLE",
    component: ChangePassword,
  },
  {
    name: "SupportScreen",
    title: "SUPPORT.TITLE",
    component: SupportScreen,
  },
  {
    name: "ConfirmCollectedClothes",
    title: "LAUNDRY.CHECK_AND_CONFIRM",
    component: ConfirmCollectedClothes,
  },
  {
    name: "RatingAskerScreen",
    title: "RATING.TASKER_RATE_ASKER_TITLE",
    component: RatingAskerScreen,
  },
  {
    name: "TrainingPremium",
    title: "TRAINING_PREMIUM.TITLE",
    component: TrainingPremium,
  },
  {
    name: "PremiumDetail",
    title: "TRAINING_PREMIUM.TASKER_PREMIUM_TITLE",
    component: PremiumDetail,
  },
  {
    name: "HappyBirthdayTasker",
    title: "NOTIFICATION.HAPPY_BIRTHDAY_TITLE",
    component: HappyBirthdayTasker,
  },
  {
    name: "ShareScreen",
    title: "TAB_ACCOUNT.TITLE_CARD_SHARE",
    component: ShareScreen,
  },
  {
    name: "ListOfToolForTasker",
    title: "TASK_DETAIL.TITLE_LIST_CLEANING_TOOL",
    component: ListOfToolForTasker,
  },
  {
    name: "MonthlyRewardDetailBenefit",
    title: "TAB_BENEFIT.BREWARD_DETAIL",
    component: MonthlyRewardDetailBenefit,
  },
  {
    name: "DeleteAccountScreen",
    title: "DELETE_ACCOUNT.TITLE",
    component: DeleteAccountScreen,
  },
  {
    name: "BCareDetail",
    title: "BCARE.TITLE",
    component: BCareDetail,
    options: { headerShown: false },
  },
  {
    name: "FAQFinanceScreen",
    title: "TAB_ACCOUNT.FINANCE",
    component: FAQFinanceScreen,
  },
  {
    name: "Community",
    title: "TAB_BENEFIT.COMMUNITY",
    component: CommunityScreen,
  },
  {
    name: "TrainingProgramList",
    title: "TRAINING_INPUT.TRAINING_PROGRAM",
    component: TrainingProgramList,
  },
  {
    name: "TrainingProgramDetail",
    title: "TRAINING_INPUT.TRAINING_DETAIL_TITLE",
    component: TrainingProgramDetail,
  },
  {
    name: "TrainingProgramVideo",
    title: "TRAINING_INPUT.TRAINING_DETAIL_TITLE",
    component: TrainingProgramVideo,
  },
  {
    name: "TrainingProgramQuiz",
    title: "TRAINING_INPUT.TRAINING_DETAIL_TITLE",
    component: TrainingProgramQuiz,
  },
  {
    name: "TrainingInput",
    title: "TRAINING_INPUT.TITLE",
    component: TrainingInput,
  },
  {
    name: "ActiveAccount",
    title: "PROCEDURE_ACTIVE_ACCOUNT.TITLE_STEP_3",
    component: UploadProfile,
  },
  {
    name: "ChooseDateTimeAppointment",
    title: "PROCEDURE_ACTIVE_ACCOUNT.TITLE_MAKE_AN_APPOINTMENT",
    component: ChooseDateTimeAppointment,
  },
  {
    name: "ChoosePlaceAppointment",
    title: "PROCEDURE_ACTIVE_ACCOUNT.TITLE_MAKE_AN_APPOINTMENT",
    component: ChoosePlaceAppointment,
  },
  {
    name: "SupplementProfile",
    title: "SUPPLEMENT_INFO.TITLE_ADD_SUPPLEMENT",
    component: SupplementProfile,
  },
  {
    name: "UploadImageProfile",
    title: "SUPPLEMENT_INFO.UPLOAD_IMAGE",
    component: UploadImageProfile,
  },
  {
    name: "CurriculumVitae",
    title: "SUPPLEMENT_INFO.TEXT_CURRICULUM",
    component: CurriculumVitae,
  },
  {
    name: "UploadImageCurriculum",
    title: "SUPPLEMENT_INFO.UPLOAD_IMAGE",
    component: UploadImageCurriculum,
  },
  {
    name: "HouseHold",
    title: "SUPPLEMENT_INFO.TEXT_RESIDENCY",
    component: HouseHold,
  },
  {
    name: "UpdateImageHouseHold",
    title: "SUPPLEMENT_INFO.UPLOAD_IMAGE",
    component: UpdateImageHouseHold,
  },

  {
    name: "CertificateConduct",
    title: "SUPPLEMENT_INFO.TEXT_CERTIFICATE",
    component: CertificateConduct,
  },
  {
    name: "UploadImageCertificate",
    title: "SUPPLEMENT_INFO.UPLOAD_IMAGE",
    component: UploadImageCertificate,
  },
  {
    name: "JourneyAndLeaderBoard",
    title: "JOURNEY.TITLE",
    component: JourneyAndLeaderBoard,
    options: { headerShown: false },
  },
  {
    name: "CalculateScoreLeaderBoard",
    title: "JOURNEY.TITLE_CALCULATE_SCORE",
    component: CalculateScoreLeaderBoard,
  },
  {
    name: "RewardStore",
    title: "BREWARD.STORE",
    component: RewardStore,
    options: { headerShown: false },
  },
  {
    name: "WeatherScreen",
    title: "WEATHER.TITLE",
    component: WeatherScreen,
  },
];
