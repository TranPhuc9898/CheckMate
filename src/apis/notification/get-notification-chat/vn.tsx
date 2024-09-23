import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
export interface IParamGetListChat {
  userId: string;
}
const getListChat = async () => {
  const param: IParamGetListChat = {
    userId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-vn/get-list-chat", param);
};
export default getListChat;
