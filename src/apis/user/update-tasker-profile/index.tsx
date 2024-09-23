import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "@src/libs/helper";

export interface IParamMakeAppointment {
  name: string;
  date?: string;
  city: string;
  phone: string;
  address: string;
}
export interface IParamUpdateTaskerProfile {
  identityCard?: Array<[]>;
  confirmationConduct?: Array<[]>;
  household?: Array<[]>;
  curriculumVitae?: Array<[]>;
  appointment?: Array<IParamMakeAppointment>;
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
