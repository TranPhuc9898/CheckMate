import DetailInfoVN from "./vn";
import DetailInfoTH from "./th";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";
import { FC } from "react";
import { IDetailInfo } from "../index";

const TaskInfo: FC<IDetailInfo> = (props) => {
  const components = new Map([
    [VIETNAM, <DetailInfoVN {...props} />],
    [THAILAND, <DetailInfoTH {...props} />],
    [INDONESIA, <DetailInfoVN {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default TaskInfo;
