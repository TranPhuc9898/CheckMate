import { fetchAPI } from "@src/libs/helper";
import { IParamNotificationIsRead } from ".";

const isReadNotification = async (notificationId: string) => {
  const params: IParamNotificationIsRead = {
    notificationId: notificationId,
  };

  return await fetchAPI("v3/api-tasker-indo/set-is-read-notification", params);
};
export default isReadNotification;
