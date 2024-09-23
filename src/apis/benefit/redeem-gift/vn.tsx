import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParamsRedeemGift } from ".";

const redeemGift = async (bRewardId) => {
  const params: IParamsRedeemGift = {
    taskerId: getUserIdGlobal(),
    id: bRewardId,
  };
  return await fetchAPI("v3/api-tasker-vn/redeem-gift", params);
};

export default redeemGift;
