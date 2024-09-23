import { fetchAPI } from "@src/libs/helper";
import { IParamsGetMyRewardDetail } from ".";

const getRewardDetail = async (params: IParamsGetMyRewardDetail) => {
  return await fetchAPI("v3/api-tasker-indo/get-my-reward-detail", params);
};

export default getRewardDetail;
