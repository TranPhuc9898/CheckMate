import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const deleteAllNotification = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-vn/remove-notification-tasker", params);
};
export default deleteAllNotification;
