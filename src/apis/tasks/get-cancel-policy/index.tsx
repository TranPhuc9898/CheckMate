import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface ICancelPolicy {
  taskId: string;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combineApi = (...arg) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(...arg);
}

export default combineApi;
