/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show dessert]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";

interface IDessert {
  haveFruit: boolean;
}

const Dessert: FC<IDessert> = ({ haveFruit }) => {
  const I18n = React.useContext(LocalizationContext);

  if (!haveFruit) {
    return null;
  }

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
          name="haveFruit"
          color="secondary"
        />
      </Box>
      <Text style={styles.contentLine}>
        {I18n.t("TASK_DETAIL.FRUIT_DESERT")}
      </Text>
    </Box>
  );
};

export default Dessert;
