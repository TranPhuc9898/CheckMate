import apiVN from "./vn";
import apiTH from "./th";
import apiID from "./id";

import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

interface IFilterBy {
  isSpecialIncentive?: boolean;
  category?: string;
  type?: "RECOMMEND_FOR_YOU" | "TOP_DEAL" | "EXCLUSIVE_DEAL";
  categoryName?: string;
  searchText?: string;
  exchangedPoint?: number;
  from?: "SYSTEM" | "SYSTEM_WITH_PARTNER";
}

export interface IParamsGetListRewards {
  taskerId?: string;
  filterBy?: IFilterBy;
  sortBy?: "LASTEST" | "POINT_DECREASE" | "POINT_INCREASE";
  page?: number;
  limit?: number;
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
