import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamGetChat } from ".";

const getChat = async (taskId: string) => {
  const params: IParamGetChat = {
    userId: getUserIdGlobal(),
    taskId: taskId,
  };

  return await fetchAPI("v3/api-tasker-vn/get-chat-message", params);
};

export default getChat;
