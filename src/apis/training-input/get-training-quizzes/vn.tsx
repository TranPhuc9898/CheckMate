import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const aPI = async () => {
  const params: IParams = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-vn/get-training-quizzes", params);
};

export default aPI;
