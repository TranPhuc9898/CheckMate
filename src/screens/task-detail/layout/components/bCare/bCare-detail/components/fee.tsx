import { Box, Card, Divider, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import styles from "../styles";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Box row>
      <Card flex>
        <Text
          center
          variant="h3"
        >
          {I18n.t("BCARE.AMOUNT_LABEL")}
        </Text>
        <Divider style={styles.dividerStyle} />
        <Text center>{I18n.t("BCARE.AMOUNT_TEXT")}</Text>
        <Text center variant="h4" color="primary" style={styles.paddingVerticalS}>{I18n.t("BCARE.AMOUNT_TEXT_1")}</Text>
      </Card>
      <Card flex>
        <Text
          center
          variant="h3"
        >
          {I18n.t("BCARE.FEE_LABEL")}
        </Text>
        <Divider style={styles.dividerStyle} />
        <Text center>{I18n.t("BCARE.FEE_TEXT")}<Text bold>{I18n.t("BCARE.FEE_TEXT_1")}</Text><Text>{I18n.t("BCARE.FEE_TEXT_2")}</Text></Text>
      </Card>
    </Box>
  );
}
