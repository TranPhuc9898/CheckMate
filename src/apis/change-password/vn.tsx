import { fetchAPI } from "@src/libs/helper";
import { IParamsChangePassword } from ".";

const changePassword = async (params: IParamsChangePassword) => {
  return await fetchAPI("v3/user-tasker-vn/change-password", params);
};
export default changePassword;
