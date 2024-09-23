import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getMyTasks = async () => {
  // Check exist user
  if (!getUserIdGlobal()) {
    return;
  }
  const params = {
    userId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-confirmed-tasks", params);
};
export default getMyTasks;
