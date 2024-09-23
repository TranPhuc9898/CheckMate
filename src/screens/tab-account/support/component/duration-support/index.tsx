import React, { useContext } from "react";

import { Box, Text } from "components";
import { spacing } from "libs/theme";
import { LocalizationContext } from "libs/context";
import _ from "lodash";
import styles from "./styles";

interface IDurationSupport {
  data: any;
  textTimeWork: any;
  textWeekend: any;
  forHR?: boolean;
}

const DurationSupport: React.FC<IDurationSupport> = ({
  data,
  textTimeWork,
  textWeekend,
  forHR,
}) => {
  const I18n = useContext(LocalizationContext);
  // Giờ hành chính
  const weekdaysOfficeHours = _.get(data, "weekdaysOfficeHours", null);
  // Ngoài giờ
  const weekdaysOutWorkingHours = _.get(data, "weekdaysOutWorkingHours", null);
  // Cuối Tuần
  const weekend = forHR
    ? _.get(data, "weekend.SATURDAY", null)
    : _.get(data, "weekend", null);
  // Show giờ hành chính
  const showWeekdaysOfficeHours = () => {
    if (_.isEmpty(weekdaysOfficeHours)) {
      return null;
    }
    return weekdaysOfficeHours?.map((item, index) => {
      return (
        <Box key={index}>
          <Text>
            {item?.from} - {item?.to}
          </Text>
        </Box>
      );
    });
  };

  // Show ngoài giờ
  const showWeekdaysOutWorkingHours = () => {
    if (_.isEmpty(weekdaysOutWorkingHours)) {
      return <Text color="primary">{I18n.t("SUPPORT.TEXT_OUT_OF_TIME")}</Text>;
    }
    return weekdaysOutWorkingHours?.map((item, index) => {
      return (
        <Box key={index}>
          <Text>
            {item?.from} - {item?.to}
          </Text>
        </Box>
      );
    });
  };
  // Show cuối tuần
  const showWeekend = () => {
    if (_.isEmpty(weekend)) {
      return null;
    }
    return weekend?.map((item, index) => {
      return (
        <Box key={index}>
          <Text>
            {item?.from} - {item?.to}
          </Text>
        </Box>
      );
    });
  };
  return (
    <Box style={{ padding: spacing.m }}>
      <Box>
        {/* Text: Thứ 2 - Thứ 7:*/}
        <Text bold>{textTimeWork}</Text>
        <Box
          row
          between
          style={styles.marginTop}
        >
          <Box flex>
            {/* Text: Giờ hành chính */}
            <Text>{I18n.t("SUPPORT.TIME_IN_WORK")}</Text>
            <Box style={styles.marginTop}>{showWeekdaysOfficeHours()}</Box>
          </Box>
          <Box flex>
            {/* Text: Ngoài giờ */}
            <Text>{I18n.t("SUPPORT.OUT_OF_TIME")}</Text>

            <Box
              flex
              style={styles.marginTop}
            >
              {/* true show test else show time outWorking hours */}
              {showWeekdaysOutWorkingHours()}
            </Box>
          </Box>
        </Box>
      </Box>
      {showWeekend() ? (
        <Box style={styles.marginTop}>
          {/* Text: Chủ nhật*/}
          <Text
            color="black"
            bold
          >
            {textWeekend}
          </Text>
          <Box style={styles.marginTop}>{showWeekend()}</Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default DurationSupport;
