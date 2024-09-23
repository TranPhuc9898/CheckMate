import { fetchAPI } from "@src/libs/helper";
import { ILogin } from "./index";

const loginAPI = async (params: ILogin) => {
  return fetchAPI("v3/user-tasker-th/login", params);
};

export default loginAPI;
