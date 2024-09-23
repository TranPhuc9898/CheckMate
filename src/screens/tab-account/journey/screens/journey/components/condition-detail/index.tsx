import React, { useContext } from "react";
import { Box, Divider, Icon, LottieView, MarkDown, Text } from "components";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { IObjectText, getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";
import styles, { width } from "./styles";
import { colors } from "libs/theme";
import Detail from "./detail";
import { ScrollView } from "react-native";

interface IJourneyDetail {
  dataCondition?: any;
  text?: IObjectText;
  title?: IObjectText;
}

const ConditionDetail: React.FC<IJourneyDetail> = ({ dataCondition, title, text }) => {
  const I18n = useContext(LocalizationContext);

  // Render extra condition
  const _renderExtraCondition = () => {
    // Nếu không có điều kiện thêm thì không hiển thị
    if (!dataCondition?.avgRating) {
      return null;
    }
    return (
      <Box row alignCenter style={styles.wrapExtraCondition}>
        <Icon
          size="l"
          name="star"
          color="secondary"
          style={styles.iconStar}
        />
        <Text fontSize="m">{I18n.t("JOURNEY.AVG_RATING_CONDITION", { t: dataCondition.avgRating })}</Text>
      </Box>
    )
  }

  const _renderPercentage = () => {
    // Nếu chưa đạt 100% thì hiển thị số %
    if (dataCondition?.percentage !== 100) {
      return (
        <Text variant="h2" color="secondary" style={styles.txtPercentage}>{dataCondition?.percentage || 0}%</Text>
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

  return (
    <ScrollView>
      {/* Header */}
      <Box center>
        <Text bold color="secondary" testID="txtTitleCondition">{getTextWithLocale(title)}</Text>
        <Text variant="h2" style={styles.textCard} testID="txtTextCondition">{getTextWithLocale(text)}</Text>
      </Box>
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
          fill={dataCondition?.percentage || 0}
          tintColor={dataCondition?.percentage === 100 ? colors.success : colors.secondary}
          backgroundColor={colors.secondary3}
          delay={300}
        />
        {_renderPercentage()}
        <Box
          row
          center
          style={styles.wrapLabelCondition}
        >
          <Text bold color={dataCondition?.percentage === 100 ? "success" : "secondary"}>{dataCondition?.completed || 0}</Text>
          <Text bold>/{dataCondition?.target}</Text>
        </Box>
      </Box>
      {/* End percentage */}

      {/* Remain */}
      <Detail detail={dataCondition?.detail} />
      {/* End remain */}

      {/* Extra condition */}
      {_renderExtraCondition()}
      {/* End extra condition */}

    </ScrollView>
  );
};

export default ConditionDetail;
