import { fetchAPI } from "@src/libs/helper";
import { IParamCancelFee } from ".";

const cancelFee = async (params: IParamCancelFee) => {
  return await fetchAPI('v3/cancel-task-indo/get-tasker-cancel-fee', params);
}
export default cancelFee;