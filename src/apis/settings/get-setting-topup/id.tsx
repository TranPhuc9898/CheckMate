import { fetchAPI } from "@src/libs/helper";

const API = async () => {
  return fetchAPI("v3/api-tasker-indo/get-setting-topup");
};

export default API;