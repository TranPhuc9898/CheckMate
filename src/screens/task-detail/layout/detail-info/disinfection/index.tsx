import DetailInfo from "./vn";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";
import { FC } from "react";
import { IDetailInfo } from "..";

const TaskInfo: FC<IDetailInfo> = (props) => {
  const components = new Map([
    [VIETNAM, <DetailInfo {...props} />],
    [THAILAND, <DetailInfo {...props} />],
    [INDONESIA, <DetailInfo {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default TaskInfo;
