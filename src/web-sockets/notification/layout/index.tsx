import { Alert, Websocket } from "@src/components";
import isReadNotification, {
  IParamNotificationIsRead,
} from "apis/notification/read-notification";
import getEndPoint from "apis/socket/notification";
import { listTypeShowModalAlert } from "libs/config";
import {
  NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY
} from "libs/constants";
import {
  getTextWithLocale,
  getUserIdGlobal,
  handleNotification,
  navigateTo,
  sendToSlack,
} from "libs/helper";
import { TOKEN_EXPIRED } from "libs/helper/error-code-list";
import { useMemo, useState } from "react";
import { TouchableOpacity, Vibration } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { logout } from "redux/slice/app-slice";
import { store } from "redux/store";
import { getListNotificationTask } from "screens/tab-notification/slice";
import { setIsReady } from "../slice";

const WebSocketsNotify = () => {
  const dispatch = useDispatch();
  const { isReady } = useSelector((state: RootState) => state.notifySocket);
  const [onShowToast, setOnShowToast] = useState(false);

  const renderSocketStatus = useMemo(() => {
    if (!isReady) {
      return <TouchableOpacity></TouchableOpacity>;
    }
  }, [isReady]);

  // Check IsRead Notification
  const setNotificationIsRead = async (id: string) => {
    const params: IParamNotificationIsRead = {
      notificationId: id,
    };
    const respond = await isReadNotification(params.notificationId);
    return respond;
  };

  const _onProcess = (mess) => {
    const { data } = mess;
    const { content, description, notificationId, isPremium } = data;
    const title = getTextWithLocale(data?.title);
    Vibration.vibrate(500);
    // Thông báo sinh nhật tasker -> navigate tới trang HappyBirthdayTasker
    if (title === NOTIFY_HAPPY_BIRTHDAY_TASKER_KEY && notificationId) {
      return navigateTo("HappyBirthdayTasker", {
        description: description,
        notifyId: notificationId,
      });
    }
    // Thông báo chứng nhận premium -> navigate tới trang PremiumDetail
    if (isPremium && notificationId) {
      setNotificationIsRead(notificationId);
      return navigateTo("PremiumDetail");
    }
    // If onShowToast is true, return
    if (onShowToast) {
      return;
    }
    // Nếu có socket TIP thì lấy thông báo mới
    if (listTypeShowModalAlert.includes(data?.data?.name)) {
      return store.dispatch(getListNotificationTask());
    }
    if (data?.description === TOKEN_EXPIRED) {
      sendToSlack(
        `UserId: ${getUserIdGlobal()}\n
        ErrorCode: ${TOKEN_EXPIRED}\n
        From: SOCKET`,
        "error-logout-tasker-v3"
      );
      return Alert.alert.open({
        message: "LOGIN.MESSAGE_TOKEN_EXPIRED",
        onClosed: () => store.dispatch(logout()),
      });
    }
    // Thông báo Task và duyệt hồ sơ navigate tới trang được truyền vào
    if (["TaskDetail", "TrainingInput"].indexOf(data?.navigateTo) > -1) {
      // Show Toast
      return Toast.show({
        type: "tomatoToast",
        visibilityTime: 5000,
        props: {
          title: title,
          content: getTextWithLocale(content),
          onPress: () => {
            Toast.hide(handleNotification(data));
          },
        },
        onShow: () => {
          setOnShowToast(true);
        },
        onHide: () => {
          setOnShowToast(false);
        },
      });
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
          // setNotify(result?.data);
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
export default WebSocketsNotify;
