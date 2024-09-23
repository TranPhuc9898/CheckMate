import { fetchAPI, getLocaleGlobal, getUserIdGlobal } from "@src/libs/helper";
import { ICancelPolicy } from ".";

const getCancelPolicy = async (params: ICancelPolicy) => {
  return await fetchAPI("v3/api-tasker-indo/get-tasker-cancel-policy", {
    taskId: params,
    taskerId: getUserIdGlobal(),
    language: getLocaleGlobal()
  });
};
export default getCancelPolicy;
