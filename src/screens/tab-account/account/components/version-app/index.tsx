import { Box, Text } from "components";
import { LocalizationContext } from "libs/context";
import { getVersionAppCode, getVersionAppName } from "libs/helper";
import { spacing } from "libs/theme";
import { useContext } from "react";
import styles from "./styles";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Box
      row
      center
      style={styles.container}
    >
      <Text
        style={styles.textStyle}
        fontSize="s"
        color="primary"
      >
        {I18n.t("LOGIN.VERSION", { t: getVersionAppName() })}
      </Text>
      <Text
        fontSize="s"
        color="primary"
      >
        {I18n.t("LOGIN.BUILD_NUMBER", { t: getVersionAppCode() })}
      </Text>
    </Box>
  );
}
