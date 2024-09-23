import { Box, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import styles from "../../layout/styles";

export default function () {
  const I18n = useContext(LocalizationContext);
  return (
    <Box flex>
      {/* Content */}
      <Box
        center
        flex
      >
        <Image
          source={require("@images/intro-app/flexible-time.png")}
          style={styles.backgroundImageStyle}
        />
        <Text
          bold
          center
          variant="h2"
          color="primary"
          style={styles.txtLabel}
        >
          {I18n.t("INTRO_APP.FLEXIBLE_TIME")}
        </Text>
        <Box
          margin="l"
          // flex
          center
        >
          <Text
            center
            style={styles.txtContent}
          >
            {I18n.t("INTRO_APP.FLEXIBLE_TIME_ID")}
          </Text>

        </Box>
      </Box>
      {/* End content */}
    </Box>
  );
}
