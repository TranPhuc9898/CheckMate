import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getTrainingProgramListAPI = async () => {
  const options = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-list-training-program", options);
};

export default getTrainingProgramListAPI;
