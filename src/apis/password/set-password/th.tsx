import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamsSetPassword } from ".";

const setPassword = async (params: IParamsSetPassword) => {
  return await fetchAPI("v3/user-tasker-th/set-password", params);
};
export default setPassword;
