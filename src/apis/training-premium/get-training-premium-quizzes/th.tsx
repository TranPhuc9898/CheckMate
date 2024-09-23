import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const getQuizzPremiumApi = async () => {
  const params: IParams = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-quiz-for-tasker-premium", params);
};

export default getQuizzPremiumApi;
