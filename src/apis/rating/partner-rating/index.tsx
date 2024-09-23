import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "@src/libs/helper";

export interface IRatingAsker {
  rate: number;
  taskId: string;
  userId: string;
  review?: string;
  feedback?: any[];
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
