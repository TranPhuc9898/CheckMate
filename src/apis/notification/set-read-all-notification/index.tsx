import apiID from "./id";
import apiTH from "./th";
import apiVN from "./vn";

import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";

import { getIsoCodeGlobal } from "libs/helper";

export interface IParamSetReadAllNotification {
  taskerId?: string;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combine = (...args) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(...args);
};

export default combine;
