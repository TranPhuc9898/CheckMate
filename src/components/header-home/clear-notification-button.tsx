import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";

import { Box, Text } from "components";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";
import { RootState } from "redux/slice";
import { store } from "redux/store";

import { setIsReadAllNotification } from "screens/tab-notification/slice";
// STYLES
import styles from "./styles";

const ClearNotificationButton = () => {
  const I18n = useContext(LocalizationContext);
  const { listNotificationTask, listNotificationSystem } = useSelector(
    (state: RootState) => state.notification
  );

  // Không hiện nút clear khi không có thông báo hoặc tât cả các thông báo đã được đọc
  if (
    !_.find(listNotificationTask, (notify: any) => !notify?.isRead) &&
    !_.find(listNotificationSystem, (notify: any) => !notify?.isRead)
  ) {
    return null;
  }

  const onSetIsRead = async () => {
    await store.dispatch(setIsReadAllNotification());
  };

  return (
    <Box style={[styles.clearButton]}>
      <TouchableOpacity
        onPress={() => onSetIsRead()}
        testID="btnNotification"
      >
        <Text
          variant="h5"
          bold
          color="white"
        >
          {I18n.t("NOTIFICATION.READ_ALL_NOTIFICATION")}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default ClearNotificationButton;
