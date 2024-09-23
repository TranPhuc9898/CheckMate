import { fetchAPI } from "@src/libs/helper";

const sendTokenToServer = async (data: any) => {
  return await fetchAPI("v3/user-tasker-th/init-raix-push-token", data);
};
export default sendTokenToServer;
