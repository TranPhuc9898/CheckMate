import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import ModalAlertTask from "./new-task";
import ModalAlertTip from "./tip";
import ModalAlertLevelUp from "./level-up";
import { typeModalWebSocket } from "libs/config";

const ModalAlert = () => {
  const { isShow, data, name } = useSelector(
    (state: RootState) => state.app?.modalAlert
  );
  // Kiểm tra có data chưa
  if (!isShow || !data) {
    return null;
  }
  switch (name) {
    case typeModalWebSocket.tip:
      return <ModalAlertTip />;
    case typeModalWebSocket.levelUp:
      return <ModalAlertLevelUp />;
    case typeModalWebSocket.task:
      return <ModalAlertTask />;
    default:
      return null;
  }
};
export default ModalAlert;
