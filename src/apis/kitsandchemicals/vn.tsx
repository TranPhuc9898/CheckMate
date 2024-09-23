import { fetchAPI } from "@src/libs/helper";

const getKitsAndChemicals = async () => {
  return await fetchAPI("v3/api-tasker-vn/get-kits-and-chemicals");
};
export default getKitsAndChemicals;
