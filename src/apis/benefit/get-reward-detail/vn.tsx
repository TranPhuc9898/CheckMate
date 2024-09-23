import { fetchAPI } from "@src/libs/helper";
import { IParamsGetRewardDetail } from ".";

const getRewardDetail = async (params: IParamsGetRewardDetail) => {
  return await fetchAPI("v3/api-tasker-vn/get-reward-detail", params);
};

export default getRewardDetail;
