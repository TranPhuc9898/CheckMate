import { TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import "moment/locale/vi";
import moment from "moment";
import { Box, Text } from "components";
import { colors } from "libs/theme";
import { formatDate, getLunaday, getRangeWeek } from "libs/helper";
import { LIMIT_DATE } from "libs/constants";
import { useSelector } from "react-redux";
import _ from "lodash";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { RootState } from "redux/slice";

const DateOfWeek = ({ onChange }) => {
  const { listDataTask } = useSelector((state: RootState) => state.myTasks);
  const [dateIndex, setDateIndex] = useState(0);
  const I18n = React.useContext(LocalizationContext);
  const dates = getRangeWeek(moment().toDate(), LIMIT_DATE);
  const handlePicker = (date, idx) => {
    let newDate = moment(date).toDate();

    // update date
    onChange(newDate);
    setDateIndex(idx);
  };

  // show date
  const shouldRenderWeekday = useMemo(() => {
    return dates.map((date, idx) => {
      const lunaDate = getLunaday(date);
      const active = Boolean(dateIndex === idx) ? colors.primary2 : null;
      const numberTaskOfDate = _.filter(
        listDataTask,
        (item) => moment(item.date).isSame(date, "day") && item?.isReceived
      ).length;

      return (
        <TouchableOpacity
          key={`weekdays_${idx}`}
          onPress={() => handlePicker(date, idx)}
          testID={`weekdays_${idx}`}
        >
          <Box
            center
            style={[styles.containerDay, { backgroundColor: active }]}
          >
            <Text
              fontSize="s"
              color="white"
            >
              {formatDate(date, "day")}
            </Text>
            <Text
              variant="h3"
              color="white"
              style={styles.txtDate}
            >
              {moment(date).format("DD")}
            </Text>
            {lunaDate ? (
              <Text
                bold
                fontSize="s"
                color="secondary"
                style={styles.textLunaDay}
              >
                {lunaDate}
              </Text>
            ) : null}
            <Text
              fontSize="s"
              color="white"
              style={styles.txtNumberTask}
            >
              {I18n.t("TASK_DETAIL.NUMBER_OF_TASK", {
                number: numberTaskOfDate,
              })}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    });
  }, [dates, dateIndex]);

  return (
    <>
      <Box
        row
        center
        style={styles.containerHeader}
      >
        <TouchableOpacity
          style={styles.btnPickToDay}
          onPress={() => handlePicker(moment(), 0)}
        >
          <Text
            bold
            fontSize="s"
            color="secondary"
            style={{
              textAlign: "center",
            }}
          >
            {I18n.t("TASK_DETAIL.BUTTON_GO_TO_DATE")}
          </Text>
        </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {shouldRenderWeekday}
        </ScrollView>
      </Box>
    </>
  );
};

export default DateOfWeek;
