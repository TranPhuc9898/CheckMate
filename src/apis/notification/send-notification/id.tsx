import { fetchAPI } from "@src/libs/helper";
import { IParamsSendNotify } from ".";

const sendNotification = async (params: IParamsSendNotify) => {
  return await fetchAPI("v3/push-notification-indo/send", params);
};
export default sendNotification;
