import { fetchAPI, getUserIdGlobal } from "@src/libs/helper";

const getFinancialTransaction = async () => {
  const params = {
    taskerId: getUserIdGlobal(),
  };
  return await fetchAPI("v3/api-tasker-th/get-financial-transactions-car-advertising", params);
};
export default getFinancialTransaction;
