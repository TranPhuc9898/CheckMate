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
  permission,
  numberOfStep,
}) => {
  const { status, percent, currentStep, totalStep } = data;
  const I18n = useContext(LocalizationContext);

  // Render footer
  const _renderFooter = () => {
    // If step is inactive
    if (permission === statusStep.lock) {
      return (
        <Icon
          name="lock"
          size="xxxl"
          color="grey1"
          testID="iconLock"
        />
      );
    }
    // If status is done
    if (status === typeStep.pass) {
      return (
        <Button
          size="md"
          testID="btnBasicTrainingSuccess"
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
        testID="btnTestBasicTrainingNow"
        onPress={() => {
          navigateTo("TabBenefit");
          navigateTo("TrainingProgramList");
        }}
        title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.BUTTON_TEST_NOW")}
      />
    );
  };

  // Check background color
  const _checkBackgroundColor = () => {
    if (permission === statusStep.open) {
      return colors.background;
    }
    return colors.grey4;
  };

  return (
    <Card
      flex
      testID="stepTrainingBasic"
      style={[
        styles.containerCard,
        {
          backgroundColor: _checkBackgroundColor(),
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
        />
        <Box
          center
          margin="xxl"
        >
          <BackgroundImage
            permission={permission}
            imageUrl={require("assets/images/active-account/step-2.png")}
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
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TITLE_STEP_2")}
          </Text>
          <Box flex>
            <Text
              center
              fontSize="m"
              style={styles.txtContent}
              color={permission === statusStep.open ? "black" : "grey1"}
            >
              {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.CONTENT_STEP_2")}
            </Text>
          </Box>
        </Box>
      </Box>
      <Process
        status={status}
        permission={permission}
        percent={percent}
        totalStep={totalStep}
        currentStep={currentStep}
      />
      <Box center>{_renderFooter()}</Box>
    </Card>
  );
};
export default BasicTraining;
