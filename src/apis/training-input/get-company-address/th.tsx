import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const aPI = async () => {
  const params: IParams = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-company-address", params);
};

export default aPI;
