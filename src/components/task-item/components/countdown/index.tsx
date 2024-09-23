import { Image, Box, Text, Icon } from "components";
import { FC, useContext, useMemo, useState, useEffect } from "react";
import moment from "moment";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { statusTask } from "libs/config";
import { colors } from "libs/theme";
const DELAY = 60000;
interface ICountdown {
  date?: Date;
  status?: string;
}

const Countdown: FC<ICountdown> = ({ date, status }) => {
  const isTaskOfToDay = moment(date).isSame(moment(), "day");
  if (!isTaskOfToDay) return null;

  const I18n = useContext(LocalizationContext);
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");

  const calculateTime = () => {
    const now = moment();
    const momentDate = moment(date).add(1, "minute");
    // Calculate minutes diff
    const diffMinutes = Number(momentDate.diff(now, "minutes"));
    // Calculate minute hours
    const diffHours = Number(momentDate.diff(now, "hours"));
    // Calculate time diff
    let hours = diffHours.toString();
    let minutes = Math.floor(diffMinutes - diffHours * 60).toString();
    // Nếu ít hơn 10' thêm số 0 trước
    if (parseInt(minutes) < 10) {
      minutes = "0" + minutes;
    }
    // Nếu ít hơn 10h thêm số 0 trước
    if (parseInt(hours) < 10) {
      hours = "0" + hours;
    }
    setMinutes(minutes);
    setHours(hours);
  };

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, DELAY);
    return () => clearInterval(interval);
  }, []);

  const renderCountdown = useMemo(() => {
    const isStarted = moment().isAfter(moment(date));
    if (status === statusTask.done) {
      return (
        <Text
          bold
          color="success"
        >
          {I18n.t("TASK_DETAIL.DONE")}
        </Text>
      )
    }
    if (isStarted) {
      return (
        <Text
          bold
          color="primary"
        >
          {I18n.t("TASK_DETAIL.TASK_IS_WORKING")}
        </Text>
      );
    }
    return (
      <Box
        row
        style={styles.boxText}
      >
        <Icon
          style={styles.iconClock}
          name="clock"
          color="primary"
          size="m"
        />
        <Text fontSize="m">
          {I18n.t("TASK_DETAIL.COUNT_DOWN_TIME_START_JOB_TASK_ITEM")}
        </Text>
        <Text
          fontSize="xl"
          color="primary"
          bold
          style={styles.txtTime}
        >
          {hours}
        </Text>
        <Text
          bold
          fontSize="m"
          color="primary"
        >
          {I18n.t("SETTINGS.HOURS")}
        </Text>
        <Text
          fontSize="xl"
          color="primary"
          bold
          style={styles.txtTime}
        >
          {minutes}
        </Text>
        <Text
          bold
          fontSize="m"
          color="primary"
        >
          {I18n.t("SETTINGS.MINUTE")}
        </Text>
      </Box>
    );
  }, [minutes, hours, date, I18n.locale]);

  return (
    <Box style={styles.wrapStatusTask}>
      <Box style={[styles.boxCountdown, status === statusTask?.done ? styles.boxDone : null]}>
        <Box style={styles.boxHook}>
          <Image
            style={styles.imageHook}
            source={require("@images/task/hook.png")}
            tintColor={status === statusTask.done ? colors.success : colors.primary}
          />
        </Box>
        {renderCountdown}
      </Box>
    </Box>
  );
};
export default Countdown;
