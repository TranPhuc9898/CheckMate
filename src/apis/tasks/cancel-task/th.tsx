import { fetchAPI } from "@src/libs/helper";
import { IParamCancelTask } from ".";

const acceptedTask = async (params: IParamCancelTask) => {
  return await fetchAPI('v2/cancel-booking/tasker-cancel-task', params);
}
export default acceptedTask;