import { fetchAPI } from "@src/libs/helper";

const getKitsAndChemicals = async () => {
  return await fetchAPI("v3/api-tasker-indo/get-kits-and-chemicals");
};

export default getKitsAndChemicals;
