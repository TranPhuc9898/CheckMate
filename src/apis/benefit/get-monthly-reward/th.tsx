import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getMonthLyReward = async () => {
  const params = {
    taskerId: getUserIdGlobal()
  };

  return await fetchAPI("v3/api-tasker-th/get-monthly-reward-info", params);
};

export default getMonthLyReward;
