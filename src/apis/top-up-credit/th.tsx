import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { THAILAND } from "libs/constants";
import { IAPI } from "./index";

const API = async (params: IAPI) => {
  const taskerId = getUserIdGlobal();
  const paramsCallAPI = {
    userId: taskerId,
    amount: Number(params.amount),
    isoCode: THAILAND,
    payment: {
      method: "PROMPT_PAY",
    },
  };
  return fetchAPI("v2/payment/top-up-credit-th", paramsCallAPI);
};
export default API;
