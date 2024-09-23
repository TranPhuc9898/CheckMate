import { fetchAPI } from "@src/libs/helper";
import { IParamCancelTask } from ".";

const acceptedTask = async (params: IParamCancelTask) => {
  return await fetchAPI('v3/cancel-task-indo/tasker-cancel', params);
}
export default acceptedTask;