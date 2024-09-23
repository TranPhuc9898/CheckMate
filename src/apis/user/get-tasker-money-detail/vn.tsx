import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const taskerId = getUserIdGlobal();
  const params = { taskerId };
  return fetchAPI("v3/api-tasker-vn/get-tasker-money-detail", params);
};

export default API;