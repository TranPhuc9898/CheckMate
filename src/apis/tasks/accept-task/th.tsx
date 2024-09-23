import { fetchAPI, getVersionAppName } from "@src/libs/helper";
import { IParamAcceptTask } from ".";

const acceptedTask = async (params: IParamAcceptTask) => {
  const options = { ...params, appVersion: getVersionAppName() };
  return await fetchAPI('v2/accept-booking/accept', options);
}
export default acceptedTask;