/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 10:42:02
 * @modify date 2022-10-25 10:42:02
 * @desc [Render content modal call]
 */

import React, { FC } from "react";
import { Box, Text } from "@src/components";
import { colors, spacing } from "libs/theme";
import { LocalizationContext } from "libs/context";
import styles from "../styles";
import { TouchableOpacity } from "react-native";
import { openUrl } from "libs/helper";
import { Icon } from "@rneui/themed";
interface IContentModalCall {
  phone: string;
}

const ContentModalCall: FC<IContentModalCall> = ({ phone }) => {
  const I18n = React.useContext(LocalizationContext);

  // Call with phone number
  const _callWithPhoneNumber = () => {
    openUrl(`tel:${phone}`);
  };

  return (
    <Box>
      <TouchableOpacity onPress={_callWithPhoneNumber}>
        <Box
          row
          alignCenter
        >
          <Icon
            name="call"
            color={colors.black}
            style={{ marginRight: spacing.m }}
          />
          <Text style={styles.optionCallText}>
            {I18n.t("TASK_DETAIL.CALL_WITH_PHONE_NUMBER")}
          </Text>
        </Box>
      </TouchableOpacity>
      {/*  TODO: Chưa mở tính năng này!!! */}
      {/* <TouchableOpacity onPress={() => console.log("Call stringee")}>
        <Box
          row
          alignCenter
        >
          <Icon
            name="call"
            color={colors.black}
            style={{ marginRight: spacing.m }}
          />
          <Text style={styles.optionCallText}>
            {I18n.t("TASK_DETAIL.CALL_WITH_BTASKEE_APP")}
          </Text>
        </Box>
      </TouchableOpacity> */}
    </Box>
  );
};

export default ContentModalCall;
