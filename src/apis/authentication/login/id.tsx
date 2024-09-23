import { fetchAPI } from "@src/libs/helper";
import { ILogin } from "./index";

const loginAPI = async (params: ILogin) => {
  return fetchAPI("v3/user-tasker-indo/login", params);
};

export default loginAPI;
