import { fetchAPI } from "@src/libs/helper";
import { IParamTranslatedChat } from ".";

const translatedChat = async (
  chatId: string,
  text: string,
  messageId: string
) => {
  const params: IParamTranslatedChat = {
    chatId: chatId,
    text: text,
    messageId: messageId,
  };

  return await fetchAPI("v3/api-tasker-th/translate-message", params);
};

export default translatedChat;
