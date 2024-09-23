import { Box, Button, Card, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";
import { useContext } from "react";
import styles from "../styles";

const Approved = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.containerHeaderCard}>
      <Box
        center
        style={styles.dividerStyle}
      >
        <Image
          source={require("assets/images/active-account/profile-approved.png")}
          style={styles.imageNotSuccess}
        />
        <Text
          testID="titleApproved"
          variant="h2"
          style={styles.containerHeaderCard}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.APPROVED_TITLE")}
        </Text>
        <Text
          center
          style={styles.txtContent}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.APPROVED_CONTENT")}
        </Text>
      </Box>
      <Button
        testID="btnMakeAppointment"
        style={styles.containerHeaderCard}
        onPress={() => navigateTo("ChooseDateTimeAppointment")}
        title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.MAKE_APPOINTMENT")}
      />
    </Card>
  );
};
export default Approved;
