import { fetchAPI } from "@src/libs/helper";
import { IParamsForgotPassword } from ".";

const forgotPassword = async (params: IParamsForgotPassword) => {
  return await fetchAPI("v3/user-tasker-vn/forgot-password", params);
};
export default forgotPassword;
