import { fetchAPI } from "@src/libs/helper";
import { IRatingAsker } from ".";

const API = async (params: IRatingAsker) => {
  return fetchAPI("v3/rating-vn/partner-rating", params);
};

export default API;
