import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IAPI } from "./index";

const API = async (params: IAPI) => {
  const taskerId = getUserIdGlobal();
  const paramsCallAPI = { taskerId, ...params };
  return fetchAPI("v3/api-tasker-th/get-weekly-payout", paramsCallAPI);
};

export default API;