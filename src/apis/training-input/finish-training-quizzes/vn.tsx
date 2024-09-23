import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const aPI = async (params: IParams) => {
  params["taskerId"] = getUserIdGlobal();
  return await fetchAPI("v3/api-tasker-vn/finish-training-quizzes", params);
};

export default aPI;
