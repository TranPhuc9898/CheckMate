/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show taste]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";

interface ITaste {
  nameTaste: number;
}

const Taste: FC<ITaste> = ({ nameTaste }) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box
      row
      alignCenter
      style={styles.lineContainer}
    >
      <Box
        row
        alignCenter
      >
        <Icon
          name="taste"
          color="secondary"
        />
      </Box>
      <Box
        flex
        row
        style={styles.contentLine}
      >
        <Text>{I18n.t("TASK_DETAIL.TASTE")}</Text>
        <Text bold>{I18n.t("TASK_DETAIL." + nameTaste)}</Text>
      </Box>
    </Box>
  );
};

export default Taste;
