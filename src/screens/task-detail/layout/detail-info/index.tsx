import DeepCleaning from "./deep-cleaning";
import AirConditioner from "./air-conditioner";
import ChildCare from "./child-care";
import Upholstery from "./upholstery";
import HomeCooking from "./home-cooking";
import Disinfection from "./disinfection";
import GroceryAssistant from "./grocery-assistant";
import Laundry from "./laundry";
import WashingMachine from "./washing-machine";
import { services } from "libs/config";
import { FC } from "react";

// DeepCleaning và OfficeCleaning sử dụng chung 1 component
import OfficeCleaning from "./deep-cleaning";

export interface IDetailInfo {
  detail?: any; // Detail task
  duration?: number; // Duration task
  serviceName: string; // Service name
  requirements?: []; // Requirements task
  paymentMethod?: string; // Payment method task
  acceptedTasker?: any; // For Deep cleaning
  collectionDate: Date;
  isReceived?: boolean;
  laundryDate?: any;
  status?: string;
  date: Date;
}

const RenderTaskDetail: FC<IDetailInfo> = (props) => {
  const components = new Map([
    [services.airConditioner, <AirConditioner {...props} />],
    [services.childCare, <ChildCare {...props} />],
    [services.deepCleaning, <DeepCleaning {...props} />],
    [services.officeCleaning, <OfficeCleaning {...props} />],
    [services.upholstery, <Upholstery {...props} />],
    [services.homeCooking, <HomeCooking {...props} />],
    [services.disinfection, <Disinfection {...props} />],
    [services.groceryAssistant, <GroceryAssistant {...props} />],
    [services.laundry, <Laundry {...props} />],
    [services.washingMachine, <WashingMachine {...props} />],
  ]);
  return components.get(props.serviceName) || null;
};
export default RenderTaskDetail;
