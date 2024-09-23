import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const getTrainingProgramDetailAPI = async (trainingTaskerId: string) => {
  const options: IParams = {
    taskerId: getUserIdGlobal(),
    trainingTaskerId: trainingTaskerId,
  };
  return await fetchAPI("v3/api-tasker-indo/get-training-by-id", options);
};

export default getTrainingProgramDetailAPI;
