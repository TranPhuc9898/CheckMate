import { Box, Button, Card, Divider, Icon, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { callSupport, formatDate } from "libs/helper";
import { colors } from "libs/theme";
import { useContext } from "react";
import styles from "../styles";

interface IAppointmentContent {
  date: string;
  address: string;
  phoneNumber: string;
}

const Success = ({ date, address, phoneNumber }: IAppointmentContent) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Card style={styles.containerHeaderCard}>
      <Box center>
        <Image
          source={require("assets/images/active-account/background-profile.png")}
          style={styles.imageStyle}
          testID="doneBackground"
        />
        <Text
          variant="h2"
          color="secondary"
          testID="titleMakeAppointmentSuccess"
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.ACTIVE_SUCCESS_TITLE")}
        </Text>
        <Text
          center
          style={styles.txtContent}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.ACTIVE_SUCCESS_CONTENT")}
        </Text>
      </Box>
      <Divider
        style={styles.dividerStyle}
        color={colors.secondary}
        width={1}
      />
      <Box
        row
        alignCenter
        style={styles.boxInfo}
      >
        <Icon
          name="clock"
          color="secondary"
          size="l"
        />
        <Box flex>
          <Text
            fontWeight="m"
            style={styles.txtInfo}
            testID="dateAppointment"
          >
            {formatDate(date)}
          </Text>
        </Box>
      </Box>
      <Box
        row
        alignCenter
        style={styles.boxInfo}
      >
        <Icon
          name="location"
          color="secondary"
          size="l"
        />
        <Box flex>
          <Text
            fontWeight="m"
            style={styles.txtInfo}
            testID="addressAppointment"
          >
            {address}
          </Text>
        </Box>
      </Box>
      <Box
        row
        alignCenter
        style={styles.boxInfo}
      >
        <Icon
          name="phoneCall"
          color="secondary"
          size="l"
        />
        <Box flex>
          <Text
            fontWeight="m"
            style={styles.txtInfo}
            testID="phoneNumberAppointment"
          >
            {phoneNumber}
          </Text>
        </Box>
      </Box>
      <Box style={styles.containerBtn}>
        <Button
          onPress={() => callSupport(phoneNumber)}
          buttonStyle={styles.btnCallStyle}
          testID="btnCall"
        >
          <Box
            row
            alignCenter
          >
            <Icon
              name="phoneCall"
              size="l"
            />
            <Text
              bold
              color="white"
              style={styles.txtInfo}
            >
              {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.BUTTON_CALL")}
            </Text>
          </Box>
        </Button>
      </Box>
    </Card>
  );
};
export default Success;
