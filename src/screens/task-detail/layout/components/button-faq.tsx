/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 20221015 10:26:24
 * @modify date 20221015 10:26:24
 * @desc [Render button task waiting asker confirm]
 */

import React, { FC } from "react";
import { Alert, Box, Button, Icon, Text, Image } from "@src/components";
import { LocalizationContext } from "libs/context";
import { colors, spacing } from "libs/theme";
import styles from "../styles";
import { statusTask } from "libs/config";

interface IButtonFAQ {
  status: string;
}

const ButtonFAQ: FC<IButtonFAQ> = ({ status }) => {
  const I18n = React.useContext(LocalizationContext);
  const _handlePopupFAQ = () => {
    if (status !== statusTask.waiting && status !== statusTask.confirmed) {
      return null;
    }
    let text = "TASK_DETAIL.MESSAGE_ALERT_FAQ_WAITING";
    if (status === statusTask.confirmed) {
      text = "TASK_DETAIL.MESSAGE_ALERT_FAQ_CONFIRMED";
    }
    return Alert.alert.open({
      title: "TASK_DETAIL.TITLE_ALERT_FAQ",
      message: (
        <Box center>
          <Image
            source={require("@images/task/warning-task.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Box style={styles.boxText}>
            <Text style={styles.text}>{I18n.t(text)}</Text>
          </Box>
        </Box>
      ),
    });
  };

  return (
    <Button
      size="md"
      onPress={_handlePopupFAQ}
      buttonStyle={styles.containerBtnFAQ}
    >
      <Box
        row
        center
      >
        <Icon
          name="faq"
          color="secondary"
          size="l"
          style={{ marginRight: spacing.s }}
        />
        <Text
          bold
          style={{ color: colors.secondary }}
        >
          {I18n.t("TASK_DETAIL.BUTTON_FAQ")}
        </Text>
      </Box>
    </Button>
  );
};

export default ButtonFAQ;
