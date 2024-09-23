/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show type eating time]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import moment from "moment";
import styles from "./styles";

interface ITypeHouseAndDuration {
  eatingTime: Date;
}

const EatingTime: FC<ITypeHouseAndDuration> = ({ eatingTime }) => {
  const I18n = React.useContext(LocalizationContext);
  const formatEatingTime = moment(eatingTime).format("HH:mm");
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
          name="clock"
          color="secondary"
        />
      </Box>
      <Box
        flex
        row
        style={styles.contentLine}
      >
        <Text>{I18n.t("TASK_DETAIL.EATING_TIME")}</Text>
        <Text bold>{formatEatingTime}</Text>
      </Box>
    </Box>
  );
};

export default EatingTime;
