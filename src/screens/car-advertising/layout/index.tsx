import CarAdvertisingVN from "./vn";
import CarAdvertisingTH from "./th";
import CarAdvertisingID from "./id";
import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";

const TaskItem = (props) => {
  const components = new Map([
    [VIETNAM, <CarAdvertisingVN {...props} />],
    [THAILAND, <CarAdvertisingTH {...props} />],
    [INDONESIA, <CarAdvertisingID {...props} />],
  ]);
  return components.get(getIsoCodeGlobal());
};
export default TaskItem;
