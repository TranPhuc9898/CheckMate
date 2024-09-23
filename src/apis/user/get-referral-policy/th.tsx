import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const taskerId = getUserIdGlobal();
  const paramsCallAPI = { taskerId };
  return fetchAPI("v3/api-tasker-th/get-referral-policy", paramsCallAPI);
};

export default API;
