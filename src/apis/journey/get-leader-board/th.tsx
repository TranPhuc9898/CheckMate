import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const params = {
    taskerId: getUserIdGlobal()
  };
  return fetchAPI("v3/api-tasker-th/get-journey-leader-board", params);
};

export default API;