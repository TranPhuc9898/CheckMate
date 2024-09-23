/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 13:49:20
 * @modify date 2022-10-25 13:49:20
 * @desc [Render button]
 */

import React, { FC } from "react";
import { Button, Text } from "@src/components";
import { borderRadius, colors } from "libs/theme";
import { formatDateFromNow } from "libs/helper";
import { LocalizationContext } from "libs/context";
import moment from "moment";
import styles from "screens/task-detail/layout/styles";

interface IButtonTaskNotStarted {
  date: Date;
}

const ButtonTaskNotStarted: FC<IButtonTaskNotStarted> = ({ date }) => {
  const I18n = React.useContext(LocalizationContext);

  const fromDate = moment(date).locale(I18n.locale).fromNow();

  return (
    <Button
      size="lg"
      buttonStyle={styles.containerBtnStart}
    >
      <Text
        bold
        color="white"
      >
        {I18n.t("TASK_DETAIL.COUNT_DOWN_TIME_START_JOB", {
          time: fromDate,
        })}
      </Text>
    </Button>
  );
};

export default ButtonTaskNotStarted;
