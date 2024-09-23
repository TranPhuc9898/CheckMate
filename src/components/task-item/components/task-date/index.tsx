import HeaderVN from "./vi";
import HeaderTH from "./th";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

export interface ITaskDate {
  date: Date;
  duration: number;
  index?: number;
}

const TaskDate = (props: ITaskDate) => {
  const components = new Map([
    [VIETNAM, <HeaderVN {...props} />],
    [THAILAND, <HeaderTH {...props} />],
    [INDONESIA, <HeaderTH {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default TaskDate;
