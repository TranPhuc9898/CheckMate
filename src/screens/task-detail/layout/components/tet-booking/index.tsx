import HeaderVN from "./vi";
import { VIETNAM, THAILAND, INDONESIA } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface IIconTet {
  isTetBooking?: boolean;
}

const IconTet = (props: IIconTet) => {
  const components = new Map([
    [VIETNAM, <HeaderVN {...props} />],
    [THAILAND, null],
    [INDONESIA, null]
  ]);
  return components.get(getIsoCodeGlobal());
};
export default IconTet;
