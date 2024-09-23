/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-02 11:11:08
 * @modify date 2023-03-02 11:11:08
 * @desc [Show error screen when error occurs]
 */

import React, { FC } from "react";

import { Box, Button, Image, Text } from "components";
import { useI18n } from "hooks/translation";

import styles from "./styles";

interface IErrorScreen {
  onPress?: () => void;
}

const ErrorScreen: FC<IErrorScreen> = ({ onPress }) => {
  const { t } = useI18n();

  const _handleOnPress = () => {
    // If onPress is null, don't show button
    if (!onPress) {
      return null;
    }
    // If onPress is not null, show button
    return (
      <Button
        title={t("ERROR.BUTTON_RELOAD")}
        onPress={onPress}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        size="md"
      />
    );
  };

  return (
    <Box
      flex
      center
    >
      <Image source={require("@images/404-home.png")} />
      <Box margin="l">
        <Text>{t("ERROR.NETWORK_REQUEST_FAILED")}</Text>
      </Box>
      {_handleOnPress()}
    </Box>
  );
};

export default ErrorScreen;
