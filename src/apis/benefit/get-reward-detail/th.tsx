import { fetchAPI } from "@src/libs/helper";
import { IParamsGetRewardDetail } from ".";

const getRewardDetail = async (params: IParamsGetRewardDetail) => {
  return await fetchAPI("v3/api-tasker-th/get-reward-detail", params);
};

export default getRewardDetail;
