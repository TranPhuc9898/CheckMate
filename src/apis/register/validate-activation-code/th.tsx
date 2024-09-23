import { fetchAPI } from "@src/libs/helper";
import { IParamsValidateActivationCode } from ".";

const validateActivationCode = async (params: IParamsValidateActivationCode) => {
  return await fetchAPI('v3/user-tasker-th/validate-activation-code', params);
}
export default validateActivationCode;