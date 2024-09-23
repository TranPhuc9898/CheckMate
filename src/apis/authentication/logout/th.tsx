import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

export interface ILogout {
  userId: string;
}

const logoutAPI = async () => {
  const params: ILogout = {
    userId: getUserIdGlobal(),
  };
  return fetchAPI("v3/user-tasker-th/logout", params);
};

export default logoutAPI;
