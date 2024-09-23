import { fetchAPI } from "@src/libs/helper";
import { IParamsSendNotify } from ".";

const sendNotification = async (params: IParamsSendNotify) => {
  return await fetchAPI("v2/push-notification/send", params);
};
export default sendNotification;
