import { useContext } from "react";
import { Box, Divider, Icon, MarkDown, Text } from "components";
import { LocalizationContext } from "libs/context";
import { colors } from "libs/theme";
import styles from "../styles";

const CalculateScore = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box row style={styles.containerWarning}>
      <Box>
        <Icon
          name="warning"
          color="secondary"
        />
      </Box>
      <Box flex style={styles.wrapContext}>
        <Text bold>{I18n.t("JOURNEY.TITLE_HOW_TO_CALCULATE_SCORE")}</Text>
        <Text fontSize="m" style={styles.txtPadding}>{I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_1")}</Text>
        <Box row>
          <Text bold fontSize="m" style={styles.txtLineHeight}>
            {I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_2")}
            <Text bold color="secondary" fontSize="m"> 1 </Text>
            <Text bold fontSize="m">+</Text>
            <Text bold color="secondary" fontSize="m">{I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_3")}</Text>
            <Text bold fontSize="m">+</Text>
            <Text bold color="secondary" fontSize="m">{I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_4")}</Text>
          </Text>
        </Box>
        <Divider width={1} color={colors.secondary} style={styles.dividerStyle} />
        <Box>
          <MarkDown text={I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_5")} />
          <Text bold fontSize="m" style={styles.txtPaddingTop}>{I18n.t("JOURNEY.TEXT_CALCULATE_SCORE_6")}</Text>
        </Box>
      </Box>
    </Box>
  )
};
export default CalculateScore;