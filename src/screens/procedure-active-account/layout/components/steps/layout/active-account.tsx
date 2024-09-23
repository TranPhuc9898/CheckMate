import { Box, Button, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { colors } from "libs/theme";
import { FC, useContext } from "react";
import { statusStep, typeStep } from "screens/procedure-active-account/layout";
import { IStepActiveAccount } from "..";
import styles from "./styles";
import BackgroundImage from "../components/background-image";
import HeaderStep from "../components/header-step";
import Process from "../components/process";
import { navigateTo } from "libs/helper";

const BasicTraining: FC<IStepActiveAccount> = ({
  data,
  callback,
  permission,
  numberOfStep,
  showOnlyActiveAccount,
}) => {
  const { status, percent, currentStep, totalStep } = data;
  const I18n = useContext(LocalizationContext);

  // Render footer
  const _renderFooter = () => {
    // If permission is inactive
    if (permission === statusStep.lock) {
      return (
        <Icon
          name="lock"
          color="grey1"
          size="xxxl"
          testID="iconLock"
        />
      );
    }
    // If step is done
    if (status === typeStep.pass) {
      return (
        <Button
          size="md"
          testID="btnUpdateProfileSuccess"
          buttonStyle={styles.btnSuccess}
        >
          <Icon name="complete" />
          <Text
            fontSize="m"
            color="white"
            fontWeight="m"
            style={styles.txtBtnSuccess}
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TEXT_SUCCESS")}
          </Text>
        </Button>
      );
    }
    // If step is processing
    return (
      <Button
        size="md"
        testID="btnUploadProfile"
        onPress={() => navigateTo("SupplementProfile", {callback: callback})}
        title={I18n.t("DIALOG.BUTTON_UPDATE")}
      />
    );
  };

  return (
    <Card
      flex
      testID="stepActiveAccount"
      style={[
        !showOnlyActiveAccount ? styles.containerCard : null,
        {
          backgroundColor:
            permission === statusStep.open ? colors.background : colors.grey4,
            borderColor: status === typeStep.pass ? colors.success : colors.grey4,
            borderWidth: 1,
        },
      ]}
    >
      <Box flex>
        <HeaderStep
          status={status}
          permission={permission}
          numberOfStep={numberOfStep}
          showOnlyActiveAccount={showOnlyActiveAccount}
        />
        <Box
          center
          margin={showOnlyActiveAccount ? "m" : "xxl"}
        >
          <BackgroundImage
            permission={permission}
            imageUrl={require("assets/images/active-account/update-profile.png")}
          />
        </Box>
        <Box
          flex
          style={styles.boxContent}
        >
          <Text
            bold
            center
            color={permission === statusStep.open ? "black" : "grey1"}
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TITLE_STEP_3")}
          </Text>
          <Text
            center
            fontSize="m"
            style={styles.txtContent}
            color={permission === statusStep.open ? "black" : "grey1"}
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.CONTENT_STEP_3")}
          </Text>
        </Box>
        <Process
          status={status}
          permission={permission}
          percent={percent}
          totalStep={totalStep}
          currentStep={currentStep}
        />
      </Box>
      <Box center>{_renderFooter()}</Box>
    </Card>
  );
};
export default BasicTraining;
