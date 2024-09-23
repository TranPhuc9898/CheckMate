import { Box, Card, Image, Text } from "components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Card>
      <Box
        row
        between
        alignCenter
      >
        <Box flex>
          <Text
            variant="h3"
            style={styles.paddingVerticalS}
          >
            {I18n.t("BCARE.CONDITION_LABEL")}
          </Text>
          <Box margin="s">
            <Text>{I18n.t("BCARE.CONDITION_TEXT")}</Text>
            <Text style={styles.paddingVerticalS}>
              {I18n.t("BCARE.CONDITION_TEXT_1")}
            </Text>
            <Text>{I18n.t("BCARE.CONDITION_TEXT_2")}</Text>
          </Box>
        </Box>
        <Image
          source={require("assets/images/bCare/condition.png")}
          style={{
            width: 60,
            height: 70,
          }}
        />
      </Box>
    </Card>
  );
}
