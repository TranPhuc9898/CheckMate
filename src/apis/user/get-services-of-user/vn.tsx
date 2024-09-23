import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const API = async () => {
  const userId = getUserIdGlobal();
  const params = { userId };
  return fetchAPI("v3/api-tasker-vn/get-services-by-user-id", params);
};

export default API;