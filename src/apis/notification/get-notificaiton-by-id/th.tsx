import { fetchAPI } from "@src/libs/helper";
import { IGetNotificationById } from ".";

const getNotificationById = async (params: IGetNotificationById) => {
  return await fetchAPI("v3/api-tasker-th/get-notification-by-id", params);
};
export default getNotificationById;
