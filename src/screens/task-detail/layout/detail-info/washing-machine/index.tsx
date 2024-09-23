import { FC } from "react";
import { IDetailInfo } from "..";
import DetailInfoVN from "./vn";
import { getIsoCodeGlobal } from "libs/helper";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";

const TaskInfo: FC<IDetailInfo> = (props) => {
  const components = new Map([
    [VIETNAM, <DetailInfoVN {...props} />],
    [THAILAND, <DetailInfoVN {...props} />],
    [INDONESIA, <DetailInfoVN {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default TaskInfo;
