/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header reward
 */
import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Text, Box, Icon, Alert } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { logout } from "redux/slice/app-slice";
import { store } from "redux/store";

interface IHeaderSetting {
  hideHeadBack?: boolean;
  navigation?: any;
  headerStyle?: object;
  giftStyle?: object;
}

const HeaderSetting: React.FC<IHeaderSetting> = ({ hideHeadBack, headerStyle, giftStyle, navigation }) => {
  const I18n = useContext(LocalizationContext);
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const onLogout = () => {
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
    <Box style={[styles.container, { height: headerHeight }]}>
      {/* Button back */}
      {!hideHeadBack ? <Box
        flex
        style={styles.btnBack}
      >
        <HeaderBackButton navigation={navigation} />
      </Box> : null}
      {/* End button back */}
      <Box style={styles.header}>
        <Text
          color="white"
          style={[styles.title, headerStyle]}
        >
          {I18n.t("SETTINGS.SETTINGS")}
        </Text>
      </Box>
      <Box style={[styles.grButton, giftStyle]}>
        <TouchableOpacity style={styles.wrapper} testID="btnLogout" onPress={onLogout}>
          <Icon name="logout" size="xl" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeaderSetting;
