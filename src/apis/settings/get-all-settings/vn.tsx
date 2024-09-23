import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  return fetchAPI("v3/api-tasker-vn/get-all-settings", { taskerId: getUserIdGlobal() });
};

export default API;