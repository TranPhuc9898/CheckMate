import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return fetchAPI("v3/api-tasker-indo/get-training-step", params);
};

export default API;
