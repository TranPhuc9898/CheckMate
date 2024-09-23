import { Box, Card, Icon, Text } from "components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Card>
      <Text
        variant="h3"
        style={styles.paddingVerticalS}
      >
        {I18n.t("BCARE.REQUIRE_LABEL")}
      </Text>
      <Box
        row
        alignCenter
        margin="s"
      >
        <Icon
          name="ticked"
          color="black"
        />
        <Text style={styles.txtRequire}>{I18n.t("BCARE.REQUIRE_TEXT_1")}</Text>
      </Box>
      <Box
        row
        alignCenter
        margin="s"
      >
        <Icon
          name="ticked"
          color="black"
        />
        <Text style={styles.txtRequire}>{I18n.t("BCARE.REQUIRE_TEXT_2")}</Text>
      </Box>
      <Box
        row
        alignCenter
        margin="s"
      >
        <Icon
          name="ticked"
          color="black"
        />
        <Text style={styles.txtRequire}>{I18n.t("BCARE.REQUIRE_TEXT_3")}</Text>
      </Box>
      <Box
        row
        alignCenter
        margin="s"
        style={styles.paddingVerticalS}
      >
        <Icon
          name="warning"
          color="primary"
          size="l"
        />
        <Text
          bold
          color="primary"
          style={styles.txtRequire}
        >
          {I18n.t("BCARE.NOTE")}
        </Text>
      </Box>
      <Text style={styles.txtRequire}>{I18n.t("BCARE.NOTE_TEXT_1")}</Text>
      <Text style={[styles.txtRequire, styles.paddingVerticalS]}>
        {I18n.t("BCARE.NOTE_TEXT_2")}
      </Text>
    </Card>
  );
}
