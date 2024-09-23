import apiID from "./id";
import apiVN from "./vn";

import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";

import { getIsoCodeGlobal, IObjectText } from "libs/helper";

export interface IParamsSendNotify {
  userIds: any;
  title: IObjectText;
  body: IObjectText,
  icon: string,
  payload: any,
};
const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiVN],
  [INDONESIA, apiID],
]);

const combine = (...args) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(...args);
};

export default combine;
