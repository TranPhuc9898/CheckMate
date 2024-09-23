import VNLayout from "./vn";
import THLayout from "./th";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "@src/libs/helper";
const Layout = (props) => {
  const components = new Map([
    [VIETNAM, <VNLayout {...props} />],
    [THAILAND, <THLayout {...props} />],
    [INDONESIA, <VNLayout {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default Layout;
