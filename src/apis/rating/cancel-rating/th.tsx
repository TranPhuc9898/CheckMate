import { fetchAPI } from "@src/libs/helper";
import { ICancelRating } from ".";

const API = async (params: ICancelRating ) => {
  return fetchAPI("v3/rating-th/close-rating-by-tasker", params);
};

export default API;
