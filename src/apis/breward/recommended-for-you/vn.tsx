import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const countNewGift = async () => {
  const params: IParams = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-vn/get-rewards-for-you", params);
};

export default countNewGift;
