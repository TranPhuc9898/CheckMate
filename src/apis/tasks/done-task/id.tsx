import { fetchAPI } from "@src/libs/helper";
import { IParamDoneTask } from ".";

const doneTask = async (params: IParamDoneTask) => {
  return await fetchAPI('v3/done-task-indo/partner-done', params);
}
export default doneTask;