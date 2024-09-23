import React, { useContext } from "react";
import { Box, Card, Divider, Icon, LottieView, MarkDown, Text } from "components";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import styles, { width } from "./styles";
import { BPOINT } from "libs/constants";
import { colors } from "libs/theme";
import moment from "moment";
import { ScrollView } from "react-native";

interface IBonusPrice {
  data?: any;
}
const BonusPrize: React.FC<IBonusPrice> = ({ data }) => {
  const I18n = useContext(LocalizationContext);

  const _renderPercentage = () => {
    // Nếu chưa đạt 100% thì hiển thị số %
    if (data?.percentage !== 100) {
      return (
        <Text variant="h2" color="secondary" style={styles.txtPercentage}>{data?.percentage}%</Text>
      )
    }
    // Đã đạt hiển thị icon tick
    return (
      <LottieView
        source={require("assets/lottie/tick.json")}
        style={styles.lottieTick}
      />
    )
  }

  // Tính số ngày đã qua
  const _renderDaytime = () => {
    // Nếu không có ngày lên cấp -> return
    if (!data?.levelUpAt) {
      return null;
    }
    // Tính khoảng cách giữa 2 ngày
    const diff = moment().diff(moment(data?.levelUpAt));
    // Đổi khoảng cách giữa 2 ngày thành ngày và giờ
    const duration = moment.duration(diff);
    // Lấy số ngày
    const days = Math.floor(duration.asDays());
    // Lấy số giờ
    const hours = duration.hours();
    // Trả về ngày giờ
    return (
      <Box>
        <Text center>{I18n.t("JOURNEY.LABEL_TIME_PASSED")}</Text>
        <Box
          row
          center
          style={styles.wrapDayLeft}
        >
          {days && <Text
            center
            variant="h3"
            color="primary"
          >
            {I18n.t("JOURNEY.DAYS", { t: days })}
          </Text>}
          {hours && <Text
            center
            variant="h3"
            color="primary"
          >
            {I18n.t("JOURNEY.HOURS", { t: hours })}
          </Text>}
        </Box>
      </Box>)
  }

  return (
    <ScrollView>
      <Divider style={styles.dividerStyle} width={1} color={colors.grey5} />
      {/* End header */}

      {/* Percentage */}
      <Box center style={styles.wrapPercentage}>
        <AnimatedCircularProgress
          width={15}
          rotation={240}
          lineCap="round"
          size={width / 3}
          arcSweepAngle={240}
          backgroundWidth={15}
          fill={data?.percentage}
          tintColor={data?.percentage === 100 ? colors.success : colors.secondary}
          backgroundColor={colors.secondary3}
        />
        {_renderPercentage()}
        <Box
          row
          center
          style={styles.wrapLabelCondition}
        >
          <Text bold color={data?.percentage === 100 ? "success" : "secondary"}>{data?.taskDone}</Text>
          <Text bold >/{I18n.t("JOURNEY.TITLE_NUMBER_OF_TASK", { t: data?.target })}</Text>
        </Box>
      </Box>
      {/* End percentage */}

      {_renderDaytime()}

      <Box style={styles.cardStyle}>
        <Text variant="h3" style={styles.titleStyle}>{I18n.t("JOURNEY.TITLE_PRIZE_BONUS_DETAIL")}</Text>
        {data?.detail?.map((item, index) => {
          return (
            <Box
              row
              flex
              between
              alignCenter
              key={"detail_" + index}
              style={styles.wrapItemBonusPrize}
            >
              <Box flex row>
                <Text bold style={styles.bPointStyle}>• </Text>
                <Box flex>
                  <MarkDown
                    text={getTextWithLocale(item?.text)}
                    paragraphStyle={styles.paragraphStyle}
                  />
                </Box>
              </Box>
              <Box style={styles.wrapIcon}>
                <Icon
                  name="reward"
                  color="grey3"
                  size="m"
                />
              </Box>
              <Box row alignCenter>
                <Text bold color="secondary" style={styles.bPointStyle}>{item?.bPoint}</Text>
                <Text fontSize="m">{BPOINT}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </ScrollView>
  );
};
export default BonusPrize;
