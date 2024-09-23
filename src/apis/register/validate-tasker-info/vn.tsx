import { fetchAPI } from "@src/libs/helper";
import { IParamsValidateTaskerInfo } from ".";

const validateTaskerInfo = async (params: IParamsValidateTaskerInfo) => {
  return await fetchAPI('v3/user-tasker-vn/validate-tasker-info', params);
}
export default validateTaskerInfo;