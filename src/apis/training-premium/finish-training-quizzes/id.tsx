import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const finishTrainingPremiumAPI = async (params: IParams) => {
  params["taskerId"] = getUserIdGlobal();
  return await fetchAPI("v3/api-tasker-indo/finish-quiz-for-tasker-premium", params);
};

export default finishTrainingPremiumAPI;
