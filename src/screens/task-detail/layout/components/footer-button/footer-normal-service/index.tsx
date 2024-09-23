import ButtonTaskPosted from "./task-posted";
import ButtonTaskWaiting from "./task-waiting";
import ButtonTaskConfirmed from "./task-confirm";
import { statusTask } from "libs/config";
import { FC } from "react";

interface IFooterButton {
  date: Date;
  phone: string;
  taskId: string;
  status: string;
  navigation: any;
  duration: number;
  isStarted: boolean;
  isMember?: boolean;
  serviceName: string;
  isEmployee?: boolean;
  acceptedTasker?: any;
  openModalCancelTask: () => void;
}

const FooterButton: FC<IFooterButton> = ({
  date,
  phone,
  status,
  taskId,
  duration,
  isMember,
  isStarted,
  navigation,
  isEmployee,
  serviceName,
  acceptedTasker,
  openModalCancelTask,
}) => {
  const components = new Map([
    [
      statusTask.posted,
      <ButtonTaskPosted
        date={date}  
        taskId={taskId}
        navigation={navigation}
      />,
    ],
    [
      statusTask.waiting,
      <ButtonTaskWaiting
        taskId={taskId}
        navigation={navigation}
        acceptedTasker={acceptedTasker}
      />,
    ],
    [
      statusTask.confirmed,
      <ButtonTaskConfirmed
        date={date}
        phone={phone}
        taskId={taskId}
        duration={duration}
        isMember={isMember}
        isStarted={isStarted}
        navigation={navigation}
        isEmployee={isEmployee}
        serviceName={serviceName}
        openModalCancelTask={openModalCancelTask}
      />,
    ],
  ]);
  return components.get(status);
};

export default FooterButton;
