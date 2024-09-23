import { Box, Text, Icon } from "@src/components";
import { formatDate } from "libs/helper";
import moment from "moment";
import { FC, useContext } from "react";
import styles from "../styles";
import { LocalizationContext } from "libs/context";

interface IDuration {
  date: Date;
  duration: number;
  showMore?: boolean;
}
const Duration: FC<IDuration> = ({ date, duration, showMore = true }) => {
  let startTime = formatDate(date, "time");
  const I18n = useContext(LocalizationContext);

  if (!duration)
    return (
      <Text
        bold
        fontSize="xl"
      >
        {startTime}
      </Text>
    );

  let endTime = formatDate(moment(date).add(duration, "hours"), "time");

  return (
    <Box>
      <Box
        row
        center
      >
        <Icon
          style={styles.iconClock}
          name="clock"
          color="primary"
          size="l"
        />
        <Text
          bold
          fontSize="xl"
        >
          {startTime} - {endTime}
        </Text>
      </Box>
      {showMore ? (
        <Text
          bold
          color="primary"
          style={styles.txtDuration}
        >
          {I18n.t("TASK_DETAIL.DURATION", { t: duration })}
        </Text>
      ) : null}
    </Box>
  );
};

export default Duration;
