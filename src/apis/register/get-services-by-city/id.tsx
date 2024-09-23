import { fetchAPI } from "@src/libs/helper";
import { IParamsGetServiceByCity } from ".";

const getServiceByCity = async (params: IParamsGetServiceByCity) => {
  return await fetchAPI('v3/api-tasker-indo/get-services-by-city', params);
}
export default getServiceByCity;