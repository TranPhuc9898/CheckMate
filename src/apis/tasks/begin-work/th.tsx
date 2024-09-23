import { fetchAPI } from "@src/libs/helper";
import { IParamBeginWork } from ".";

const beginWork = async (params: IParamBeginWork) => {
  return await fetchAPI('v3/api-tasker-th/begin-work', params);
}
export default beginWork;