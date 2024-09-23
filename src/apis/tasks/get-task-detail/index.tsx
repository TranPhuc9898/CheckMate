import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";
export interface IParamGetTaskDetail {
  userId: string;
  taskId: string;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combineApi = (args: IParamGetTaskDetail) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(args);
}

export default combineApi;
