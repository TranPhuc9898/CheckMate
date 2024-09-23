import { Box, Card, Image, Text } from "components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Card style={styles.containerRole}>
      <Box
        row
        between
        alignCenter
      >
        <Box flex>
          <Text variant="h3">{I18n.t("BCARE.ROLE_LABEL")}</Text>
          <Text style={styles.paddingVerticalS}>
            {I18n.t("BCARE.ROLE_TEXT")}
          </Text>
        </Box>
        <Image
          source={require("assets/images/bCare/bTaskee.png")}
          style={styles.imageRole}
        />
      </Box>
    </Card>
  );
}
