import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getCarAdvertisingInfo = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-tasker-car-advertising-info", params);
};
export default getCarAdvertisingInfo;
