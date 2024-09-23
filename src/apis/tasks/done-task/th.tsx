import { fetchAPI } from "@src/libs/helper";
import { IParamDoneTask } from ".";

const doneTask = async (params: IParamDoneTask) => {
  return await fetchAPI('v2/done-booking/partner-done', params);
}
export default doneTask;