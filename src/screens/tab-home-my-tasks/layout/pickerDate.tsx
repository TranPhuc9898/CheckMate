import "moment/locale/vi";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

import { Box, Text } from "components";
import { LIMIT_DATE } from "libs/constants";
import { LocalizationContext } from "libs/context";
import { checkAnimationDisable, checkTaskDateWithSelectDate, formatDate, getLunaday, getRangeWeek } from "libs/helper";
import { colors } from "libs/theme";
import { RootState } from "redux/slice";

import styles from "./styles";

const DateOfWeek = ({ onChange, defaultIndexDateFilter }) => {
  const { listDataTask } = useSelector((state: RootState) => state.myTasks);
  const [dateIndex, setDateIndex] = useState(0);
  const [dates, setDates] = useState<any>(getRangeWeek(moment().toDate(), LIMIT_DATE));
  const I18n = React.useContext(LocalizationContext);
  const scrollRef = useRef(null);
  // Get last task accepted
  const lastAcceptedTask = _.last(listDataTask);
  // Get first task accepted
  const beforeAcceptedTask = _.first(listDataTask);
  useEffect(() => {
    if (defaultIndexDateFilter) {
      setDateIndex(defaultIndexDateFilter);
    }
  }, [defaultIndexDateFilter]);

  useEffect(() => {
    /**
     * So sánh ngày nhận việc cuối cùng của Tasker với LIMIT_DATE để hiện thị nút xem thêm
     * Nếu tính đến thời điểm hiện tại, ngày nhận việc cuối cùng của Tasker lớn hơn LIMIT_DATE thì hiển thị nút xem thêm
     * Khi ngày hiển thị trên UI vượt quá ngày nhận việc cuối cùng thì ẩn nút xem thêm đi
     */
    if (
      moment(lastAcceptedTask?.date)
        .endOf("day")
        .isAfter(
          moment()
            .add(LIMIT_DATE - 1, "day")
            .endOf("day")
        )
    ) {
      setDates(getRangeWeek(moment().toDate(), LIMIT_DATE + 1));
    }
  }, [lastAcceptedTask?.date, beforeAcceptedTask?.date]);

  const handlePicker = (date, idx) => {
    const newDate = moment(date).toDate();
    // update date
    onChange(newDate);
    setDateIndex(idx);
  };

  // show date
  const shouldRenderWeekday = useMemo(() => {
    return dates.map((date, idx) => {
      const lunaDate = getLunaday(date);
      const active = dateIndex === idx ? colors.secondary3 : null;
      const colorTextActive = dateIndex === idx ? "secondary" : "white";
      const numberTaskOfDate = _.filter(listDataTask, (item) => checkTaskDateWithSelectDate(date, item.date)).length;

      return (
        <TouchableOpacity
          key={`weekdays_${idx}`}
          onPress={() => handlePicker(date, idx)}
          testID={`weekdays_${idx}`}
        >
          {idx >= LIMIT_DATE && numberTaskOfDate > 0 ? (
            <Box style={[styles.btnSeeMore, { backgroundColor: active }]}>
              <Box
                center
                style={styles.boxSeeMore}
              >
                <Text
                  bold
                  fontSize="m"
                  color={colorTextActive}
                  center
                >
                  {I18n.t("TASK_DETAIL.SEE_MORE")}
                </Text>
              </Box>
              <Box
                center
                style={styles.boxNumberTaskSeeMore}
              >
                <Text
                  fontSize="s"
                  color={colorTextActive}
                  style={styles.txtNumberTask}
                  testID={`numberTaskOfDate_${idx}`}
                >
                  {I18n.t("TASK_DETAIL.NUMBER_OF_TASK", {
                    number: numberTaskOfDate,
                  })}
                </Text>
              </Box>
            </Box>
          ) : (
            <Box
              center
              style={[styles.containerDay, { backgroundColor: active }]}
            >
              <Text
                bold
                fontSize="s"
                color={colorTextActive}
              >
                {formatDate(date, "day")}
              </Text>
              <Text
                variant="h3"
                color={colorTextActive}
                style={styles.txtDate}
              >
                {moment(date).format("DD/M")}
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
                color={colorTextActive}
                style={styles.txtNumberTask}
                testID={`numberTaskOfDate_${idx}`}
              >
                {I18n.t("TASK_DETAIL.NUMBER_OF_TASK", {
                  number: numberTaskOfDate,
                })}
              </Text>
            </Box>
          )}
        </TouchableOpacity>
      );
    });
  }, [dates, dateIndex, listDataTask]);

  return (
    <Box
      row
      center
      style={styles.containerHeader}
    >
      <TouchableOpacity
        style={styles.btnPickToDay}
        onPress={() => {
          // Scroll to top
          scrollRef?.current?.scrollTo({
            animated: !checkAnimationDisable(),
            x: 0,
            y: 0,
          });
          handlePicker(moment(), 0);
        }}
      >
        <Text
          bold
          center
          fontSize="m"
          color="secondary"
          style={styles.txtToDay}
        >
          {I18n.t("TASK_DETAIL.BUTTON_GO_TO_DATE")}
        </Text>
      </TouchableOpacity>
      <ScrollView
        ref={(ref) => {
          scrollRef.current = ref;
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {shouldRenderWeekday}
      </ScrollView>
    </Box>
  );
};

export default DateOfWeek;
