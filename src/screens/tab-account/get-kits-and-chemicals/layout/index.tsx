import { getIsoCodeGlobal } from "@src/libs/helper";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import VNLayout from "./vn";
const Layout = (props) => {
  const components = new Map([
    [VIETNAM, <VNLayout {...props} />],
    [THAILAND, null],
    [INDONESIA, null],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default Layout;
