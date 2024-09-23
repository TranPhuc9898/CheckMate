import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { capitalizedFirstStr, formatDate, getLunaHoliday } from "libs/helper";
import moment from "moment";
import { FC, useContext } from "react";
import styles from "../styles";
import { ITaskDate } from "./index";
import Duration from "../duration";

const TaskDate: FC<ITaskDate> = ({ date, index, duration }) => {
  const taskDate = formatDate(date, "date");
  const lunaDate = getLunaHoliday(date);
  const I18n = useContext(LocalizationContext);

  const _renderToday = () => {
    if (moment(date).isSame(moment(), "day")) {
      return (
        <Text
          color="primary"
          style={styles.txtToday}
          bold
          fontSize="m"
        >
          {I18n.t("TASK_DETAIL.TODAY")}
        </Text>
      );
    }
    if (moment(date).isSame(moment().add(1, "days"), "day")) {
      return (
        <Text
          color="primary"
          style={styles.txtToday}
          bold
          fontSize="m"
        >
          {I18n.t("TASK_DETAIL.TOMORROW")}
        </Text>
      );
    }
    return (
      <Text
        bold
        fontSize="m"
        color="primary"
        style={styles.txtToday}
      >
        {capitalizedFirstStr(formatDate(date, "weekday"))}
      </Text>
    );
  };

  const _renderLunaDate = () => {
    if (!lunaDate) {
      return null;
    }
    return (
      <Text
        fontSize="m"
        bold
        color="primary"
        style={styles.textLunaDay}
      >
        {" - "} {lunaDate}
      </Text>
    );
  };

  return (
    <Box
      between
      row
      style = {styles.containerDate}
    >
      <Box
        row
        flex
        style={styles.flexEnd}
      >
        <Box style={styles.wrapRightIcon}>
          <Icon
            style={styles.iconClock}
            name="date"
            color="primary"
            size="l"
          />
        </Box>
        <Box>
          <Text
            testID={`taskDate_${index}`}
            bold
            fontSize="xl"
            numberOfLines={1}
          >
            {taskDate}
          </Text>
          <Box row style={styles.txtDay}>
            {_renderToday()}
            {_renderLunaDate()}
          </Box>
        </Box>
      </Box>
      <Duration
        date={date}
        duration={duration}
      />
    </Box>
  );
};

export default TaskDate;
