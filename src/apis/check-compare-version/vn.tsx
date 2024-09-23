import { fetchAPI } from "@src/libs/helper";
import { IParamCheckCompareVersion } from ".";

const checkCompareVersion = async (version: string, platform: string) => {
  const params: IParamCheckCompareVersion = {
    version: version,
    platform: platform,
  };

  return await fetchAPI("v3/api-tasker-vn/check-compare-version", params);
};

export default checkCompareVersion;
