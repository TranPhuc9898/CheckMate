import { Box, Card, Text } from "components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Card>
      <Text variant="h3">{I18n.t("BCARE.BENEFIT_LABEL")}</Text>
      <Box>
        <Text style={styles.paddingVerticalS}>
          {I18n.t("BCARE.BENEFIT_TEXT")}
        </Text>
        <Box margin="s">
          <Text>{I18n.t("BCARE.BENEFIT_TEXT_1")}</Text>
          <Text>{I18n.t("BCARE.BENEFIT_TEXT_2")}</Text>
          <Text>{I18n.t("BCARE.BENEFIT_TEXT_3")}</Text>
          <Text>{I18n.t("BCARE.BENEFIT_TEXT_4")}</Text>
        </Box>
        <Text style={styles.paddingVerticalS}>
          {I18n.t("BCARE.BENEFIT_TEXT_5")}
        </Text>
      </Box>
    </Card>
  );
}
