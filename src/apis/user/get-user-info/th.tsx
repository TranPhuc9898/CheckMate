import { fetchAPI, getUserIdGlobal, getUserTokenGlobal } from "@src/libs/helper";

const API = async () => {
  const params = {
    userId: getUserIdGlobal(),
    loginToken: getUserTokenGlobal()
  };
  return fetchAPI("v3/api-tasker-th/get-user-by-id", params);
};

export default API;