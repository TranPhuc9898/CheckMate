import React from "react";
import { LocalizationContext } from "@src/libs/context";
import { Alert, Box, Button, Card, Text } from "@src/components";
import RNRestart from "react-native-restart";
import styles from "./styles";

const RestartApp = () => {
  const I18n = React.useContext(LocalizationContext);

  const _onReStartApp = () => {
    return Alert.alert.open({
      message: "TAB_ACCOUNT.TEXT_RESTAR_APP",
      actions: [
        {
          testID: "btnConfirmLogout",
          text: "DIALOG.BUTTON_CONFIRM",
          onPress: () => {
            Alert.alert.close();
            RNRestart.Restart();
          },
        },
        { text: "DIALOG.BUTTON_CLOSE", style: "cancel" },
      ],
    });
  };

  return (
    <Card>
      <Text
        testID="txtResetApp"
        variant="h3"
        color="primary"
      >
        {I18n.t("TAB_ACCOUNT.TITLE_RESTART_APP")}
      </Text>
      <Box center>
        <Button
          title={I18n.t("TAB_ACCOUNT.BUTTON_RESTART_APP")}
          onPress={_onReStartApp}
          testID="btnReStartApp"
          containerStyle={styles.btnStyle}
          // buttonStyle={styles.btnContainer}
          size="md"
        />
      </Box>
    </Card>
  );
};

export default RestartApp;
