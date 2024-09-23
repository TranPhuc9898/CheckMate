import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const deleteAllNotification = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI(
    "v3/api-tasker-th/remove-notification-tasker",
    params
  );
};
export default deleteAllNotification;
