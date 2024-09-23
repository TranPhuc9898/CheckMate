import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "@src/libs/helper";

export interface IAPI {
  amount: number;
}

const apis = new Map([
  [THAILAND, apiTH],
  [INDONESIA, apiID],
  [VIETNAM, null],
]);

const combine = (...args) => {
  const api = apis.get(getIsoCodeGlobal());
  return api ? api(...args) : null;
};

export default combine;
