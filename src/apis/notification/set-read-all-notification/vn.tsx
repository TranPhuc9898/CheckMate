import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamSetReadAllNotification } from ".";

const setIsReadAllNotificationAPI = async () => {
  const params: IParamSetReadAllNotification = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-vn/set-is-read-notification-by-tasker", params);
};
export default setIsReadAllNotificationAPI;
