import { fetchAPI, getVersionAppName } from "@src/libs/helper";
import { IParamAcceptTask } from ".";

const acceptedTask = async (params: IParamAcceptTask) => {
  const options = { ...params, appVersion: getVersionAppName() };
  return await fetchAPI("v3/accept-task-indo/accept", options);
};
export default acceptedTask;
