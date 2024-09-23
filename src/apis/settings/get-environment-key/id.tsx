import { fetchAPI } from "@src/libs/helper";

export default async () => {
  return fetchAPI("v3/api-tasker-indo/get-environment-key");
};