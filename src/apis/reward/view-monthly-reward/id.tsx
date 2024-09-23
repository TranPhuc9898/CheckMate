import { fetchAPI } from "@src/libs/helper";
import { IParamsViewMonthlyReward } from ".";
const viewMonthlyReward = async (params:IParamsViewMonthlyReward) => {
  return await fetchAPI('v3/api-tasker-indo/view-monthly-reward', params);
}
export default viewMonthlyReward;