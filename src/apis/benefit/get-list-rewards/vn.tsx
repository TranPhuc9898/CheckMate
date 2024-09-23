import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamsGetListRewards } from ".";

const getListBRewards = async (params: IParamsGetListRewards) => {
  params.taskerId = getUserIdGlobal();
  return await fetchAPI("v3/api-tasker-vn/get-list-rewards", params);
};

export default getListBRewards;
