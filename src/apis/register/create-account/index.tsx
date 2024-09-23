import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface IParamsRegister {
    username: string;
    name: string;
    phone: string;
    countryCode: string;
    language: string;
    email: string;
    password: string;
    serviceIds?: any;
    workingPlaces?: any;
    referralCode?: string;
    idNumber: string;
}

const apis = new Map([
  [VIETNAM, apiVN],
  [THAILAND, apiTH],
  [INDONESIA, apiID],
]);

const combineApi = (...args) => {
  const api = apis.get(getIsoCodeGlobal());
  return api(...args);
};

export default combineApi;
