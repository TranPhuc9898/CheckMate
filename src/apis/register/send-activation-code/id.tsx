import { fetchAPI } from "@src/libs/helper";
import { IParamsSendActivationCode } from ".";

const sendActivationCode = async (params: IParamsSendActivationCode) => {
  return await fetchAPI('v3/user-tasker-indo/send-activation-code', params);
}
export default sendActivationCode;