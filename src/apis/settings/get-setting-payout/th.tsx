import { fetchAPI } from "@src/libs/helper";

const API = async () => {
  return fetchAPI("v3/api-tasker-th/get-setting-payout");
};

export default API;