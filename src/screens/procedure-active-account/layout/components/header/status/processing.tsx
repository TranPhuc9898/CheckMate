import { Box, Button, Card, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import styles from "../styles";

const Processing = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.containerHeaderCard}>
      <Box center>
        <Image
          source={require("assets/images/active-account/step-3.png")}
          style={styles.imageNotSuccess}
        />
        <Text
          variant="h2"
          testID="titleProcessing"
          style={styles.containerHeaderCard}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.PROCESSING_TITLE")}
        </Text>
        <Text
          center
          style={styles.txtContent}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.PROCESSING_CONTENT")}
        </Text>
      </Box>
      <Button
        disabled={true}
        testID="btnMakeAppointmentDisabled"
        style={styles.containerHeaderCard}
        title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.MAKE_APPOINTMENT")}
      />
    </Card>
  );
};
export default Processing;
