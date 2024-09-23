import { fetchAPI } from "@src/libs/helper";
import { IParamNotificationIsReadChat } from ".";

const isReadNotificationChat = async (chatId: string) => {
  const params: IParamNotificationIsReadChat = {
    chatId: chatId,
  };

  return await fetchAPI("v3/api-tasker-th/set-is-read-chat-message", params);
};
export default isReadNotificationChat;
