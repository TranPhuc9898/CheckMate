import { fetchAPI } from "@src/libs/helper";

const getBrewardCategories = async () => {
  return await fetchAPI("v3/api-tasker-th/get-breward-categories", {});
};

export default getBrewardCategories;
