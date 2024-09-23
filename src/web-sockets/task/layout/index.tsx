import { Websocket } from "@src/components";
import getEndPoint from "apis/socket/task";
import { statusTask } from "libs/config";
import { IObjectText, getTextWithLocale } from "libs/helper";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { openModalAlert } from "redux/slice/app-slice";
import { store } from "redux/store";
import { setIsReady, setNewTasksSocket, setMyTasksSocket } from "../slice";

import { Vibration } from "react-native";
import { MODAL_ALERT_TASK } from "libs/constants";
interface IDataModalNotifyTask {
  serviceText: IObjectText;
  district: IObjectText;
  taskId: string;
}

const WebSocketsTask = () => {
  const dispatch = useDispatch();
  const { isReady } = useSelector((state: RootState) => state.tasksSocket);

  const { isVibration } = useSelector((state: RootState) => state.app);
  const renderSocketStatus = useMemo(() => {
    if (isReady) {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }, [isReady]);

  const _onProcess = (result: any) => {
    // Nếu task không phải newTask hoặc status không phải POSTED thì return
    if (
      store.getState().app?.modalAlert?.isShow ||
      result?.source !== "newTask" ||
      result?.data?.status !== statusTask.posted
    ) {
      return;
    }
    let data: IDataModalNotifyTask = {
      taskId: result?.data?._id,
      district: getTextWithLocale(result?.data?.district),
      serviceText: result?.data?.serviceText,
    };
    store.dispatch(openModalAlert({ data: data, name: MODAL_ALERT_TASK }));
    {
      isVibration ? Vibration.vibrate(500) : null;
    }
  };

  return (
    <>
      <Websocket
        url={getEndPoint()}
        onOpen={() => {
          setIsReady(true);
        }}
        onMessage={(e) => {
          // Check data exist
          if (!e?.data || typeof e.data !== "string") {
            return;
          }
          const result = JSON.parse(e.data);
          const option = {
            newTask: setNewTasksSocket,
            confirmedTask: setMyTasksSocket,
          };
          const actionSocket = option[result.source];
          actionSocket && dispatch(actionSocket(result));
          _onProcess(result);
        }}
        onError={(e) => {
          dispatch(setIsReady(false));
        }}
        onClose={(e) => {
          dispatch(setIsReady(false));
        }}
        reconnect // Will try to reconnect onClose
      />
      {renderSocketStatus}
    </>
  );
};
export default WebSocketsTask;
