import { THAILAND, VIETNAM, INDONESIA } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper"; // Map IsoCode
import HeadNotificationChatAppTH from "./th";
import HeadNotificationChatAppVN from "./vn";

const NotificationChatItem = () => {
  const components = new Map([
    [VIETNAM, <HeadNotificationChatAppVN />],
    [THAILAND, <HeadNotificationChatAppTH />],
    [INDONESIA, null],
  ]);
  return components.get(getIsoCodeGlobal());
};

export default NotificationChatItem;
