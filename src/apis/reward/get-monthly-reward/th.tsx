import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IGetMonthlyReward } from ".";

const getMonthlyRewardAPI = async (rewardId: string) => {
  const params: IGetMonthlyReward = {
    taskerId: getUserIdGlobal(),
  };
  if (rewardId) {
    params.rewardId = rewardId
  }

  return await fetchAPI("v3/api-tasker-th/get-monthly-reward-detail", params);
};
export default getMonthlyRewardAPI;
