import { fetchAPI } from "@src/libs/helper";
import { IParamsGetEmployeesByCompany } from ".";

const getEmployeesByCompany = async (params: IParamsGetEmployeesByCompany) => {
  return await fetchAPI("v3/api-tasker-vn/get-employees-by-company", params);
};

export default getEmployeesByCompany;
