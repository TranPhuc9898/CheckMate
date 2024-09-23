import { fetchAPI } from "@src/libs/helper";
import { IParamsDrawTask } from ".";

const drawTask = async (params: IParamsDrawTask) => {
  return await fetchAPI('v3/cancel-task-indo/tasker-withdraw-task', params);
}
export default drawTask;