import { fetchAPI } from "@src/libs/helper";
import { IParamsRegister } from ".";

const sendActivationCode = async (params: IParamsRegister) => {
  return await fetchAPI('v3/user-tasker-indo/sign-up', params);
}
export default sendActivationCode;