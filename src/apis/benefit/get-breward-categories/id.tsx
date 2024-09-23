import { fetchAPI } from "@src/libs/helper";

const getBrewardCategories = async () => {
  return await fetchAPI("v3/api-tasker-indo/get-breward-categories", {});
};

export default getBrewardCategories;
