import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
const getListBRewardsHomePage = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-indo/get-reward-home-page", params);
};

export default getListBRewardsHomePage;
