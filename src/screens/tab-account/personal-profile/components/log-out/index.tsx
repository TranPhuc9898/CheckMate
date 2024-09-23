import { Alert, Text, Box, Button, Icon } from "components";

import styles from "./styles";
import React, { useContext } from "react";
import { LocalizationContext } from "libs/context";
import { store } from "redux/store";
import { logout } from "redux/slice/app-slice";

const LogOut = () => {
  // Hook
  const I18n = useContext(LocalizationContext);
  //Arrow Function
  const _onLogout = () => {
    return Alert.alert.open({
      title: "TAB_ACCOUNT.LOGOUT",
      message: (
        <Text
          bold
          center
          color="primary"
          style={styles.textLogoutNote}
        >
          {I18n.t("TAB_ACCOUNT.LOGOUT_CONFIRM")}
        </Text>
      ),
      actions: [
        {
          testID: "btnConfirmLogout",
          text: "TAB_ACCOUNT.LOGOUT",
          style: "cancel",
          onPress: () => {
            Alert.alert.close();
            store.dispatch(logout());
          },
        },
        { text: "DIALOG.BUTTON_CLOSE", style: "ok" },
      ],
    });
  };

  return (
    <Box style={styles.boxQRCode}>
      <Button
        size="lg"
        testID="btnLogout"
        onPress={_onLogout}
        color={"secondary"}
        title={I18n.t("TAB_ACCOUNT.LOGOUT")}
      >
        <Icon
          name="logout"
          size="xxl"
        />
        <Box style={styles.textLogout}>
          <Text
            bold
            color="white"
          >
            {I18n.t("TAB_ACCOUNT.LOGOUT")}
          </Text>
        </Box>
      </Button>
    </Box>
  );
};

export default LogOut;
