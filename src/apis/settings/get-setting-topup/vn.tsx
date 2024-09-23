import { fetchAPI } from "@src/libs/helper";

const API = async () => {
  return fetchAPI("v3/api-tasker-vn/get-setting-topup");
};

export default API;