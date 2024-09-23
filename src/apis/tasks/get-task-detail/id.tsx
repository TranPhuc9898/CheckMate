import { fetchAPI } from "@src/libs/helper";
import { IParamGetTaskDetail } from ".";

const getTaskDetail = async (params: IParamGetTaskDetail) => {
  return await fetchAPI('v3/api-tasker-indo/get-task-detail', params);
}
export default getTaskDetail;