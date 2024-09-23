import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamUpdateTaskerProfile } from ".";

const UpdateTaskerProfileAPI = async (params:IParamUpdateTaskerProfile) => {
  const taskerId = getUserIdGlobal();
  const paramsCallAPI = { taskerId, ...params };
  return fetchAPI("v3/api-tasker-th/update-tasker-profile",paramsCallAPI);
};
export default UpdateTaskerProfileAPI;