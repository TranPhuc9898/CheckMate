import { Box, Card, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import styles from "../styles";
import StepIndicator from "react-native-step-indicator";
import { colors } from "libs/theme";

export default function () {
  const I18n = useContext(LocalizationContext);
  const labels = [
    I18n.t("BCARE.PROCEDURE_TEXT_1"),
    I18n.t("BCARE.PROCEDURE_TEXT_2"),
    I18n.t("BCARE.PROCEDURE_TEXT_3"),
  ];
  return (
    <Card flex>
      <Text
        variant="h3"
        style={styles.paddingVerticalS}
      >
        {I18n.t("BCARE.PROCEDURE_LABEL")}
      </Text>
      <Box>
        <StepIndicator
          customStyles={{
            labelAlign: "flex-start",
            stepIndicatorCurrentColor: colors.primary,
            stepIndicatorUnFinishedColor: colors.primary,
            stepStrokeCurrentColor: colors.primary,
            separatorUnFinishedColor: colors.primary,
            currentStepStrokeWidth: 0,
            currentStepIndicatorSize: 30,
            stepIndicatorLabelCurrentColor: colors.white,
            stepIndicatorLabelUnFinishedColor: colors.white
          }}
          labels={labels}
          direction="vertical"
          stepCount={3}
          renderLabel={({ label }) => {
            return (
              <Box flex style={styles.boxProcedureText}>
                <Text>{label}</Text>
              </Box>
            );
          }}
        />
      </Box>
    </Card>
  );
}
