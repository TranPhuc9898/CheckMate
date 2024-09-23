import { fetchAPI } from "@src/libs/helper";

export default async () => {
  return fetchAPI("v3/api-tasker-th/get-environment-key");
};