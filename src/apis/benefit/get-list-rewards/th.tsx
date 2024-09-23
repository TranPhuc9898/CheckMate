import { fetchAPI } from "@src/libs/helper";
import { IParamsGetListRewards } from ".";

const getListBRewards = async (params: IParamsGetListRewards) => {
  return await fetchAPI("v3/api-tasker-th/get-list-rewards", params);
};

export default getListBRewards;
