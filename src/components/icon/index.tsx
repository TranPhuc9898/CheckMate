import Image, { ICustomImage } from "@components/image";
import { colors } from "@src/libs/theme";

export const ICON_SIZE_S = 12;
export const ICON_SIZE_M = 16;
export const ICON_SIZE_L = 20;
export const ICON_SIZE_XL = 24;
export const ICON_SIZE_XXL = 28;
export const ICON_SIZE_XXXL = 32;

export interface IIconName {
  right: number;
  left: number;
  down: number;
  up: number;
  tiktok: number;
  youtube: number;
  facebook: number;
  line: number;
  hourglass: number;
  premium: number;
  subscription: number;
  pet: number;
  cook: number;
  iron: number;
  bringTools: number;
  location: number;
  chat: number;
  call: number;
  cancel: number;
  map: number;
  faq: number;
  success: number;
  home: number;
  homeFill: number;
  benefit: number;
  benefitFill: number;
  account: number;
  accountFill: number;
  back: number;
  notification: number;
  starFill: number;
  star: number;
  logout: number;
  help: number;
  share: number;
  zalo: number;
  honey: number;
  logoBtaskee: number;
  logoCycle: number;
  diner: number;
  dish: number;
  vaccine: number;
  clock: number;
  avgRating: number;
  testCovid: number;
  haveFruit: number;
  goMarket: number;
  airConditioner: number;
  image: number;
  listTask: number;
  sofa: number;
  child: number;
  eyeSlash: number;
  trash: number;
  chatRight: number;
  chatSend: number;
  messageDot: number;
  keyboard: number;
  doubleDown: number;
  save: number;
  phone: number;
  qrCode: number;
  tet: number;
  eyeOpen: number;
  transaction: number;
  gift: number;
  filter: number;
  checked: number;
  withdraw: number;
  topUp: number;
  camera: number;
  position: number;
  tabNotification: number;
  tabNotificationFill: number;
  phoneCall: number;
  copy: number;
  resetPass: number;
  leader: number;
  bell: number;
  warning: number;
  tip: number;
  collectMoney: number;
  sun: number;
  outAndIndoor: number;
  bCare: number;
  checkReward: number;
  unChecked: number;
  reward: number;
  ticked: number;
  taste: number;
  referral: number;
  icUp: number;
  icDown: number;
  checkLine: number;
  slasheLine: number;
  checkDouble: number;
  slasheFill: number;
  lock: number;
  complete: number;
  supplementCheck: number;
  upload: number;
  myReward: number;
  logoLanguage: number;
  oftenUseService: number;
  workedForAsker: number;
  dropUp: number;
  dropDown: number;
  saveImage: number;
  search: number;
  close: number;
  point: number;
  facebook_outline: number;
  instagram_outline: number;
  mail_outline: number;
  web: number;
  location_social: number;
  date: number;
  cleaningGlasses: number;
  vacuumingOfficeCarpets: number;
  washingMachine: number;
}
interface IIconSize {
  /**
   * 12
   */
  s: number;

  /**
   * 16
   */
  m: number;

  /**
   * 20
   */
  l: number;

  /**
   * 24
   */
  xl: number;

  /**
   * 28
   */
  xxl: number;

  /**
   * 32
   */
  xxxl: number;
}

export const iconSize: IIconSize = {
  s: ICON_SIZE_S,
  m: ICON_SIZE_M,
  l: ICON_SIZE_L,
  xl: ICON_SIZE_XL,
  xxl: ICON_SIZE_XXL,
  xxxl: ICON_SIZE_XXXL,
};

export const iconName: IIconName = {
  right: require("@icons/tasks/right.png"),
  left: require("@icons/tasks/left.png"),
  down: require("@icons/tasks/icon-down.png"),
  up: require("@icons/tasks/icon-up.png"),
  tiktok: require("@icons/benefit/tiktok.png"),
  youtube: require("@icons/benefit/youtube.png"),
  facebook: require("@icons/benefit/facebook.png"),
  line: require("@icons/benefit/line.png"),
  hourglass: require("@icons/tasks/icon-waiting-confirm.png"),
  premium: require("@icons/tasks/icon-premium.png"),
  subscription: require("@icons/tasks/icon-subscription.png"),
  pet: require("@icons/tasks/icon-pet.png"),
  cook: require("@icons/tasks/icon-cook.png"),
  iron: require("@icons/tasks/icon-iron.png"),
  bringTools: require("@icons/tasks/icon-cleaning-tool.png"),
  location: require("@icons/tasks/icon-location.png"),
  chat: require("@icons/tasks/icon-btn-chat.png"),
  call: require("@icons/tasks/icon-btn-call.png"),
  cancel: require("@icons/tasks/icon-btn-cancel.png"),
  map: require("@icons/tasks/icon-map.png"),
  faq: require("@icons/tasks/icon-faq.png"),
  success: require("@icons/tasks/icon-success.png"),
  home: require("@icons/tabs/tab-home.png"),
  homeFill: require("@icons/tabs/tab-home-fill.png"),
  benefit: require("@icons/tabs/tab-benefit.png"),
  benefitFill: require("@icons/tabs/tab-benefit-fill.png"),
  account: require("@icons/tabs/tab-account.png"),
  accountFill: require("@icons/tabs/tab-account-fill.png"),
  back: require("@icons/tabs/back.png"),
  notification: require("@icons/tabs/notification.png"),
  starFill: require("@icons/tasks/star-fill.png"),
  star: require("@icons/tasks/star.png"),
  logout: require("@icons/account/logout.png"),
  help: require("@icons/account/help.png"),
  share: require("@icons/benefit/share.png"),
  zalo: require("@icons/benefit/zalo.png"),
  honey: require("@icons/benefit/honey.png"),
  logoBtaskee: require("@icons/logo-btaskee.png"),
  logoCycle: require("@icons/logo-cycle.png"),
  diner: require("@icons/tasks/diner.png"),
  dish: require("@icons/tasks/dish.png"),
  vaccine: require("@icons/tasks/vaccine.png"),
  clock: require("@icons/tasks/clock.png"),
  avgRating: require("@icons/tasks/avg-rating.png"),
  testCovid: require("@icons/tasks/test-result-covid.png"),
  goMarket: require("@icons/tasks/go-market.png"),
  haveFruit: require("@icons/tasks/dessert.png"),
  airConditioner: require("@icons/tasks/air-conditioner.png"),
  image: require("@icons/tasks/image.png"),
  listTask: require("@icons/tasks/list-task.png"),
  sofa: require("@icons/tasks/sofa.png"),
  child: require("@icons/tasks/child.png"),
  eyeSlash: require("@icons/account/eye-slash.png"),
  eyeOpen: require("@icons/account/eye-open.png"),
  trash: require("@icons/notification/trash.png"),
  chatRight: require("@icons/chat/icon-chat-right.png"),
  chatSend: require("@icons/chat/icon-chat-send.png"),
  messageDot: require("@icons/chat/suggested_chat.png"),
  keyboard: require("@icons/chat/suggested_keyboard.png"),
  doubleDown: require("@icons/chat/double-down.png"),
  save: require("@icons/tasks/save.png"),
  phone: require("@icons/tasks/phone.png"),
  qrCode: require("@icons/tasks/qr-code.png"),
  tet: require("@icons/tasks/tet.png"),
  transaction: require("@icons/car-advertising/icon-transaction.png"),
  gift: require("@icons/gift.png"),
  filter: require("@icons/filter.png"),
  checked: require("@icons/checked.png"),
  withdraw: require("@icons/account/withdraw.png"),
  topUp: require("@icons/account/top-up.png"),
  camera: require("@icons/chat/camera.png"),
  position: require("@icons/chat/position.png"),
  tabNotification: require("@icons/tabs/tab-notification.png"),
  tabNotificationFill: require("@icons/tabs/tab-notification-fill.png"),
  phoneCall: require("@icons/phone-call.png"),
  copy: require("@icons/account/copy.png"),
  resetPass: require("@icons/account/reset-password.png"),
  leader: require("@icons/tasks/icon-leader.png"),
  bell: require("@icons/tasks/bell.png"),
  warning: require("@icons/warning.png"),
  tip: require("@icons/tasks/tips.png"),
  collectMoney: require("@icons/tasks/collect-money.png"),
  sun: require("@icons/tasks/sun.png"),
  outAndIndoor: require("@icons/tasks/out-and-indoor.png"),
  bCare: require("@icons/tasks/bCare.png"),
  checkReward: require("@icons/check-reward.png"),
  unChecked: require("@icons/unChecked.png"),
  reward: require("@icons/reward.png"),
  ticked: require("@icons/bCare/ticked.png"),
  taste: require("@icons/tasks/taste.png"),
  referral: require("@icons/referral.png"),
  icUp: require("@icons/tasks/ic-up.png"),
  icDown: require("@icons/tasks/ic-down.png"),
  checkLine: require("@icons/training/check-line.png"),
  slasheLine: require("@icons/training/slashe-line.png"),
  checkDouble: require("@icons/training/check-double.png"),
  slasheFill: require("@icons/training/slashe-fill.png"),
  lock: require("@icons/account/lock.png"),
  complete: require("@icons/account/complete.png"),
  supplementCheck: require("@icons/supplement/supplement-check.png"),
  upload: require("@icons/upload.png"),
  myReward: require("@icons/benefit/my-reward.png"),
  logoLanguage: require("@icons/logo-language.png"),
  oftenUseService: require("@icons/tasks/often-use-service.png"),
  workedForAsker: require("@icons/tasks/worked-for-asker.png"),
  dropDown: require("@icons/tasks/drop-down.png"),
  dropUp: require("@icons/tasks/drop-up.png"),
  saveImage: require("@icons/account/save-image.png"),
  search: require("@icons/benefit/search.png"),
  close: require("@icons/benefit/close.png"),
  point: require("@icons/benefit/point.png"),
  facebook_outline: require("@icons/social/facebook_outline.png"),
  instagram_outline: require("@icons/social/instagram-outline.png"),
  mail_outline: require("@icons/social/mail-outline.png"),
  web: require("@icons/social/web.png"),
  location_social: require("@icons/social/location_social.png"),
  date: require("@icons/tasks/icon-date.png"),
  vacuumingOfficeCarpets: require("@icons/tasks/vacuuming-office-carpets.png"),
  cleaningGlasses: require("@icons/tasks/cleaning-glasses.png"),
  washingMachine: require("@icons/tasks/washing-machine.png"),
};

interface ICustomIcon extends ICustomImage {
  /**
   * Name of icon
   */
  name: keyof typeof iconName;

  /**
   * Size of icon
   */
  size?: keyof typeof iconSize;

  /**
   * Color of icon
   */
  color?: keyof typeof colors;

  /**
   * Height of icon
   */
  height?: number;

  /**
   * Width of icon
   */
  width?: number;
}

/**
 * - size?: "s": 12 | "m": 16 | "l": 20 | "xl": 24 | "xxl": 28 | "xxxl": 32 | "max": 36;
 * - color?: Color of icon
 * - height?: Height and width of icon
 */
const CustomIcon: React.FunctionComponent<ICustomIcon> = ({ name, size, color, style, width, height, ...other }) => {
  const uri = iconName[name];
  const sizeIcon = iconSize[size];
  const tintColor = colors[color];
  return (
    <Image
      {...other}
      tintColor={tintColor}
      style={[style, { width: width || sizeIcon, height: height || sizeIcon }]}
      source={uri}
    />
  );
};

CustomIcon.defaultProps = {
  color: "white",
  size: "xl",
};

export default CustomIcon;
