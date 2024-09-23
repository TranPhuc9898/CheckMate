import { fetchAPI } from "@src/libs/helper";
import { IParamCancelFee } from ".";

const cancelFee = async (params: IParamCancelFee) => {
  return await fetchAPI('v2/cancel-booking/get-tasker-cancel-fee', params);
}
export default cancelFee;