import { fetchAPI } from "@src/libs/helper";
import { IParamSendChat } from ".";

const getSendChat = async (params: IParamSendChat) => {
  return await fetchAPI("v3/api-tasker-vn/send-chat-message", params);
};

export default getSendChat;
