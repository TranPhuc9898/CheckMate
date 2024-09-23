import { fetchAPI } from "@src/libs/helper";
import { IParamsGetMyRewards } from ".";

const getMyBRewards = async (params: IParamsGetMyRewards) => {
  return await fetchAPI("v3/api-tasker-vn/get-my-rewards", params);
};

export default getMyBRewards;
