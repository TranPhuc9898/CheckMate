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
          source={require("@images/intro-app/community-reward.png")}
          style={styles.backgroundImageStyle}
        />
        <Text
          bold
          center
          variant="h2"
          color="primary"
          style={styles.txtLabel}
        >
          {I18n.t("INTRO_APP.COMMUNITY_REWARD_TITLE_TH")}
        </Text>
        <Box
          margin="l"
          center
        >
          <Text
            center
            style={styles.txtContent}
          >
            {I18n.t("INTRO_APP.COMMUNITY_REWARD_CONTENT_TH")}
          </Text>
        </Box>
      </Box>
      {/* End content */}
    </Box>
  );
}
