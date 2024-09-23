import { fetchAPI, getIsoCodeGlobal } from "@src/libs/helper";

const getWorkingPlaces = async () => {
  const params = {
    isoCode: getIsoCodeGlobal()
  };

  return await fetchAPI('v3/api-tasker-indo/get-sign-up-working-places', params);
}
export default getWorkingPlaces;