import { Box, Image, Text } from "components";
import styles from "../styles";
import { spacing } from "libs/theme";
import { useContext } from "react";
import { LocalizationContext } from "libs/context";

const BackgroundTop = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box style={styles.containerHeader}>
      <Image
        source={require("@src/assets/images/bCare/background-bCare.png")}
        style={styles.backgroundHeader}
      />
      <Text
        variant="h1"
        color="white"
      >
        {I18n.t("TAB_BENEFIT.BCARE")}
      </Text>
      <Text
        style={{
          paddingVertical: spacing.s,
        }}
        color="white"
        fontSize="xl"
      >
        {I18n.t("BCARE.TITLE")}
      </Text>
    </Box>
  );
};
export default BackgroundTop;
