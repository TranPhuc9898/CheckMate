import React from "react";
import { Dimensions } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Text } from "@src/components";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { colors, spacing } from "libs/theme";

import styles from "./styles"

const CommunityScreen = () => {
  // Get user info
  const { name, phone } = useSelector((state: RootState) => state.app.user);
  const I18n = React.useContext(LocalizationContext);
  return (
    <Card>
      {/* --------------------------------- HEADER --------------------------------- */}
      <Box center>
        <Text
          color="primary"
          fontSize="xl"
          numberOfLines={2}
          bold
        >
          {I18n.t("TAB_ACCOUNT.TITLE_QA_CODE")}
        </Text>
        <Box
          center
          margin="l"
          style={styles.qrCode}
        >
          <QRCode
            value={name + "_" + phone}
            size={Math.round(Dimensions.get("window").width / 1.8)}
            logo={require("@src/assets/images/btaskee.png")}
            logoSize={spacing.xxl}
            logoBackgroundColor={colors.primary}
            logoBorderRadius={5}
            logoMargin={8}
          />
        </Box>

    <Box >
    <Text center color="grey1" bold>{I18n.t("TAB_ACCOUNT.TEXT_QR")}</Text>
    </Box>
      </Box>
      {/* ------------------------------- END HEADER ------------------------------- */}
    </Card>
  );
};

export default CommunityScreen;
