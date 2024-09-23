import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";
import { IParams } from ".";

const aPI = async (params: IParams) => {
  params["taskerId"] = getUserIdGlobal();
  return await fetchAPI("v3/api-tasker-vn/finish-training-video", params);
};

export default aPI;
