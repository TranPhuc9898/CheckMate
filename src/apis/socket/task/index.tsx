import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

const getEndPoint = () => {
  const apis = new Map([
    [VIETNAM, apiVN()],
    [THAILAND, apiTH()],
    [INDONESIA, apiID()],
  ]);
  return apis.get(getIsoCodeGlobal())
};

export default getEndPoint;
