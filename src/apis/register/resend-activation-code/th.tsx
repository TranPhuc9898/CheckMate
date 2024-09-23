import { fetchAPI } from "@src/libs/helper";
import { IParamsReSendActivationCode } from ".";

const resendActivationCode = async (params: IParamsReSendActivationCode) => {
  return await fetchAPI('v3/user-tasker-th/resend-activation-code', params);
}
export default resendActivationCode;