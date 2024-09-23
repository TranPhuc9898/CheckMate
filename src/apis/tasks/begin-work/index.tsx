import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface IParamBeginWork {
  taskId: string;
  userId: string;
  lat: any;
  lng: any;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combineApi = (args: IParamBeginWork) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(args);
}

export default combineApi;
