import { fetchAPI } from "@src/libs/helper";
import { IParamCollectClothes } from ".";

const collectClothes = async (params: IParamCollectClothes) => {
  return await fetchAPI('v3/api-tasker-th/collect-clothes', params);
}
export default collectClothes;