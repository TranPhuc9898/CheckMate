import * as React from "react";

import { LocalizationContext } from "@src/libs/context";
import { Box, Text, Image } from "@src/components";
import styles from "./styles";

const ComingSoon = () => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box flex center>
      <Image
        style={styles.comingSoon}
        source={require("assets/images/coming-soon.png")}
      >
        <Text
          center
          italic
          variant="h3"
          color="white"
          style={styles.txtComingSoon}
        >
          {I18n.t("TOPUP.COMING_SOON").toUpperCase()}
        </Text>
      </Image>
    </Box>
  );
};

export default ComingSoon;
