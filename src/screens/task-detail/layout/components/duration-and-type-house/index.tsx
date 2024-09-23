import HouseKeeping from "./house-keeping";
import Cleaning from "./cleaning";
import Disinfection from "./disinfection";
import { services } from "libs/config";
import { FC } from "react";
import { IObjectText } from "libs/helper";
export interface ITypeHouseAndDuration {
  detail?: any;
  status?: string;
  duration?: number;
  description?: string;
  serviceName?: string;
  homeType?: IObjectText;
}

const RenderTaskDetail: FC<ITypeHouseAndDuration> = (props) => {
  const components = new Map([
    ["default", <Cleaning {...props} />],
    [services.houseKeeping, <HouseKeeping {...props} />],
    [services.disinfection, <Disinfection {...props} />],
  ]);
  return components.get(props.serviceName) || components.get("default");
};
export default RenderTaskDetail;
