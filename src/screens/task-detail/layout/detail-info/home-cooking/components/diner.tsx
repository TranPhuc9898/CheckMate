/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show diner]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";

interface ITypeHouseAndDuration {
  numberEater: number;
}

const Diner: FC<ITypeHouseAndDuration> = ({ numberEater }) => {
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
          name="diner"
          color="secondary"
        />
      </Box>
      <Box
        flex
        row
        style={styles.contentLine}
      >
        <Text>{I18n.t("TASK_DETAIL.NUMBER_OF_DINER")}</Text>
        <Text bold>{numberEater}</Text>
      </Box>
    </Box>
  );
};

export default Diner;
