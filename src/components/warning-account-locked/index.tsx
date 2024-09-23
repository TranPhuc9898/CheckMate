import { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box, Text, Image, Button } from "components";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";
import { spacing } from "libs/theme";

const WarningAccountLocked = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box flex margin="l">
      <Box flex center>
        <Image
          source={require("assets/images/account-locked.png")}
          style={styles.image}
        />
        <Text center style={styles.txtStyle}>{I18n.t("LOGIN.MESSAGE_ACCOUNT_TASKER_LOCK")}</Text>
      </Box>
      <Button
        title={I18n.t("SUPPORT.SWITCH_BOARD")}
        onPress={() => navigateTo("SupportScreen")}
      />
    </Box>
  );
};

export default WarningAccountLocked;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
  },
  txtStyle: {
    paddingVertical: spacing.l
  }
})