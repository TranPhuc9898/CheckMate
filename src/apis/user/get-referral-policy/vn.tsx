import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const userId = getUserIdGlobal();
  const paramsCallAPI = { userId };
  return fetchAPI("v3/api-tasker-vn/get-referral-policy", paramsCallAPI);
};

export default API;
