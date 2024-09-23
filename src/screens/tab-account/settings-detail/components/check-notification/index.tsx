import { Alert, Box, Button, Card, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { getLocaleGlobal, handleError, IRespond } from "libs/helper";
import sendNotificationAPI, {
  IParamsSendNotify,
} from "apis/notification/send-notification";
import RNExitApp from "react-native-exit-app";
import styles from "./styles";

const CheckNotification = () => {
  const I18n = useContext(LocalizationContext);
  const { user } = useSelector((state: RootState) => state.app);

  const _handleSendNotify = () => {
    if (!user) {
      return null;
    }
    const userIds = [
      {
        userId: user?._id,
        language: getLocaleGlobal(),
      },
    ];
    const title = {
      vi: I18n.t("TAB_ACCOUNT.TITLE_TEST_NOTIFICATION"),
      en: I18n.t("TAB_ACCOUNT.TITLE_TEST_NOTIFICATION"),
      th: I18n.t("TAB_ACCOUNT.TITLE_TEST_NOTIFICATION"),
      id: I18n.t("TAB_ACCOUNT.TITLE_TEST_NOTIFICATION"),
    };
    const body = {
      vi: I18n.t("TAB_ACCOUNT.TITLE_CHECK_NOTIFICATION"),
      en: I18n.t("TAB_ACCOUNT.TITLE_CHECK_NOTIFICATION"),
      th: I18n.t("TAB_ACCOUNT.TITLE_CHECK_NOTIFICATION"),
      id: I18n.t("TAB_ACCOUNT.TITLE_CHECK_NOTIFICATION"),
    };
    const icon = "ic_notification.png";
    const payload = {
      type: 0,
      taskId: "",
    };
    const params: IParamsSendNotify = {
      userIds: userIds,
      title: title,
      body: body,
      icon: icon,
      payload: payload,
    };
    Alert.alert.open({
      message: "TAB_ACCOUNT.INFO_TEST_NOTIFICATION",
      actions: [
        {
          text: "DIALOG.BUTTON_ACCEPT",
          testID: "btnOk",
          onPress: async () => {
            Alert.alert.close();
            // Call api send notification
            const result: IRespond = await sendNotificationAPI(params);
            // Success -> Exist app
            if (result?.isSuccess) {
              RNExitApp.exitApp();
            }
            // Handle error
            return handleError(result?.error);
          },
        },
      ],
    });
  };

  return (
    <Card>
      <Text
        testID="txtCheckNotify"
        variant="h3"
        color="primary"
      >
        {I18n.t("TAB_ACCOUNT.TITLE_CHECK_NOTIFICATION")}
      </Text>
      <Box center>
        <Button
          testID="btnSendNotify"
          onPress={_handleSendNotify}
          title={I18n.t("TAB_ACCOUNT.BUTTON_CHECK_NOTIFICATION")}
          size="md"
          buttonStyle={styles.btnContainer}
        />
      </Box>
    </Card>
  );
};
export default CheckNotification;
