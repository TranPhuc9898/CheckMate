import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getMonthLyReward = async () => {
  const params = {
    taskerId: getUserIdGlobal()
  };

  return await fetchAPI("v3/api-tasker-indo/get-monthly-reward-info", params);
};

export default getMonthLyReward;
