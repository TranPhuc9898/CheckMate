import { fetchAPI } from "@src/libs/helper";
import { IGetBPointTransaction } from ".";

const getBPointTransactionAPI = async (params: IGetBPointTransaction) => {
  return await fetchAPI("v3/api-tasker-vn/get-bpoint-transactions", params);
};
export default getBPointTransactionAPI;
