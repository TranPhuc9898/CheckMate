import ButtonTaskPosted from "./task-posted";
import ButtonTaskConfirmed from "./task-confirm";
import { statusTask } from "libs/config";
import { FC } from "react";

export interface IFooterButtonLaundry {
  status: string;
  date: Date;
  isStarted: boolean;
  duration: number;
  navigation: any;
  openModalCancelTask: () => void;
  taskId: string;
  phone: string;
  serviceName?: string;
  acceptedTasker?: any;
  detail?: any;
}

const FooterButton: FC<IFooterButtonLaundry> = (props) => {
  const components = new Map([
    [
      statusTask.posted,
      <ButtonTaskPosted {...props}/>,
    ],
    [
      statusTask.confirmed,
      <ButtonTaskConfirmed {...props}/>,
    ],
  ]);
  return components.get(props?.status);
};

export default FooterButton;
