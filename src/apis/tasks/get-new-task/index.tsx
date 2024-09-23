import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface IGetNewTask {
  sortBy?: string;
  isTaskerWorkingPlaces?: boolean;
  userId?: string;
  limit?: number;
  page?: number;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combineApi = (...args) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(...args);
}

export default combineApi;