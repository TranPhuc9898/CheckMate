import { fetchAPI } from "@src/libs/helper";
import { IParamNotificationDelete } from ".";

const deleteNotification = async (notificationId: string) => {
  const params: IParamNotificationDelete = {
    notificationId: notificationId,
  };
  return await fetchAPI("v3/api-tasker-th/remove-notification-by-id", params);
};
export default deleteNotification;
