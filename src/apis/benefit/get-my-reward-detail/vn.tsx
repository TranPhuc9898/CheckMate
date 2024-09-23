import { fetchAPI } from "@src/libs/helper";
import { IParamsGetMyRewardDetail } from ".";

const getRewardDetail = async (params: IParamsGetMyRewardDetail) => {
  return await fetchAPI("v3/api-tasker-vn/get-my-reward-detail", params);
};

export default getRewardDetail;
