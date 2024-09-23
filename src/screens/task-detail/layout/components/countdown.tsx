/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render countdown]
 */

import { Box, Countdown } from "@src/components";
import moment from "moment";
import { FC } from "react";
import styles from "../styles";
interface ICountdownDetail {
  duration: number;
  date: Date;
  isStarted: boolean;
}

const CountdownDetail: FC<ICountdownDetail> = ({
  duration,
  date,
  isStarted,
}) => {
  if (moment(date).isAfter() || !isStarted) {
    return null;
  }
  const timeToNow = moment().diff(moment(date), "s");
  const until = duration * 3600 - timeToNow;
  return (
    <Box
      flex
      style={styles.containerCountdown}
    >
      <Countdown until={until} />
    </Box>
  );
};

export default CountdownDetail;
