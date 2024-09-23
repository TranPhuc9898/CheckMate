import { fetchAPI } from "@src/libs/helper";
import { IParamsDrawTask } from ".";

const drawTask = async (params: IParamsDrawTask) => {
  return await fetchAPI('v2/cancel-booking/tasker-withdraw-task', params);
}
export default drawTask;