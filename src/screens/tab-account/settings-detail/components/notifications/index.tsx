import React, { FunctionComponent, ComponentProps, useContext } from "react";
import { TouchableOpacity, Vibration, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Switch } from "@rneui/themed";
import { Box, Text, SelectDropdown } from "@src/components";
import { IRespond, handleError } from "libs/helper";
import { updateReceiveNotificationAPI, updateTimeRemindAPI } from "apis/user";
import RNRestart from "react-native-restart";
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import { setVibration } from "redux/slice/app-slice";
const listRemind = [30, 40, 50, 60, 70, 80, 90];
interface INotifications extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
  setLoading?: (isloading: boolean) => void;
  setLocale?: (language: string) => void;
  getUserInfo: any;
}

const NotificationScreen: FunctionComponent<INotifications> = ({
  setLoading,
  user,
  getUserInfo,
}) => {
  const I18n = useContext(LocalizationContext);

  const { isVibration } = useSelector((state: RootState) => state.app);
  const updateReceiveNotification = async (value) => {
    setLoading(true);
    const respond: IRespond = await updateReceiveNotificationAPI({
      noReceiveNotification: !value,
    });
    setLoading(false);

    // Khi chọn option nhận thông báo sẽ reload lại app để gửi token mới lên server
    if (respond.isSuccess) {
      getUserInfo();
      value && RNRestart.Restart();
      return;
    }
    handleError(respond?.error);
  };

  const onSelectItem = async (item, index) => {
    setLoading(true);
    const respond: IRespond = await updateTimeRemindAPI({
      timeRemindByMinute: item,
    });
    setLoading(false);

    if (respond.isSuccess) {
      return getUserInfo();
    }
    handleError(respond?.error);
  };

  return (
    <Box style={styles.boxContainer}>
      <Text
        bold
        color="primary"
        fontSize="xl"
      >
        {I18n.t("SETTINGS.NOTIFICATION")}
      </Text>
      <Box
        row
        center
        style={[styles.boxIteam, styles.boxContainer]}
      >
        <Text>{I18n.t("SETTINGS.NOTIFICATION_TASK")}</Text>
        <Switch
          value={!user.noReceiveNotification}
          onValueChange={(value) => updateReceiveNotification(value)}
        />
      </Box>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text>{I18n.t("SETTINGS.REMIND")}</Text>
        <SelectDropdown
          data={listRemind}
          defaultButtonText={
            <Text>
              {user.timeRemindByMinute || 60} {I18n.t("SETTINGS.MINUTE")}
            </Text>
          }
          rowTextForSelection={(item: any) => {
            return (
              <Text>
                {item} {I18n.t("SETTINGS.MINUTE")}
              </Text>
            );
          }}
          onSelect={onSelectItem}
          buttonStyle={styles.buttonStyle}
        />
      </Box>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Box flex>
          <Text>{I18n.t("SETTINGS.TEXT_VIBRATION")}</Text>
        </Box>
        <Switch
          value={isVibration}
          onValueChange={(value) => {
            store.dispatch(setVibration(value))
          }}
        />
      </Box>

    </Box>
  );
};

export default NotificationScreen;
