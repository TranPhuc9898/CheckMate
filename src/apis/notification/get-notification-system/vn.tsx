import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamNotificationSystem } from ".";

const getNotificationSystem = async (
  limit: number,
  page: number,
  getTypeFrombTaskee: boolean
) => {
  const params: IParamNotificationSystem = {
    taskerId: getUserIdGlobal(),
    limit: limit,
    page: page,
    getTypeFrombTaskee: getTypeFrombTaskee,
  };
  return await fetchAPI("v3/api-tasker-vn/get-notification", params);
};
export default getNotificationSystem;
