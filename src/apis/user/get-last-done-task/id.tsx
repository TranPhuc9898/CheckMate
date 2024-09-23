import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return fetchAPI("v3/api-tasker-indo/get-last-done-task", params);
};

export default API;
