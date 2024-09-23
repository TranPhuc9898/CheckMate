import apiID from "./id";
import apiTH from "./th";
import apiVN from "./vn";

import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface IParamDataSendChat {
  userId?: string;
  userName?: string;
  isRead?: boolean;
  from?: string;
  message?: string;
  to?: string;
  image?: string;
  location?: {
    longitude?: any;
    latitude?: any;
  };
  video?: string;
}
export interface IParamSendChat {
  chatId?: string;
  messageTo?: [string];
  data?: IParamDataSendChat;
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

