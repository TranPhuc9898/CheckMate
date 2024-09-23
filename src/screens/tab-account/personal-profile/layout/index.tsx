import IDLayout from "./id";
import VNLayout from "./vn";
import THLayout from "./th";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "@src/libs/helper";
import { useEffect } from "react";
import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";
const Layout = (props) => {
  useEffect(() => {
    trackingCleverTapScreenView("My Profile");
  }, []);

  const components = new Map([
    [VIETNAM, <VNLayout {...props} />],
    [THAILAND, <THLayout {...props} />],
    [INDONESIA, <IDLayout {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default Layout;
