import { fetchAPI } from "@src/libs/helper";
import { IParamCollectClothes } from ".";

const collectClothes = async (params: IParamCollectClothes) => {
  return await fetchAPI('v3/api-tasker-indo/collect-clothes', params);
}
export default collectClothes;