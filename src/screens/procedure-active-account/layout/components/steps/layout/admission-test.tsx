import { Box, Button, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { callSupport, getIsoCodeGlobal, navigateTo } from "libs/helper";
import { colors } from "libs/theme";
import { FC, useContext } from "react";
import { statusStep, typeStep } from "screens/procedure-active-account/layout";
import { IStepActiveAccount } from "..";
import BackgroundImage from "../components/background-image";
import HeaderStep from "../components/header-step";
import styles from "./styles";
import { phoneSupportRecruitment } from "libs/config";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const AdmissionTest: FC<IStepActiveAccount> = ({
  data,
  permission,
  numberOfStep,
}) => {
  const { status, numberOfTime, maxNumberOfTime } = data;
  const { settingSystem } = useSelector((state: RootState) => state.app);

  const I18n = useContext(LocalizationContext);

  // Render footer
  const _renderFooter = () => {
    // If step is inactive
    if (status === typeStep.pass) {
      return (
        <Button
          size="md"
          testID="btnSuccess"
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
    // If step is false
    if (status === typeStep.failed) {
      const phoneNumber = settingSystem?.supports?.phoneRecruitment || phoneSupportRecruitment[getIsoCodeGlobal()];
      return (
        <Box
          center
          style={styles.boxFooter}
        >
          <Text
            fontSize="m"
            color="error"
            testID="txtTestFalse"
            style={styles.txtTestFalse}
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TEST_FALSE")}
          </Text>
          <Button
            size="md"
            onPress={() => callSupport(phoneNumber)}
            testID="btnCallSupport"
            title={I18n.t("DIALOG.BUTTON_CALL_SUPPORT")}
          />
        </Box>
      );
    }
    // If step is processing
    return (
      <Button
        size="md"
        testID="btnTestAdmissionTestNow"
        onPress={() => navigateTo("TrainingInput")}
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

  const _renderNumberOfTime = () => {
    if (numberOfTime) {
      return (
        <Box
          row
          between
          style={styles.boxProcess}
        >
          <Text
            fontSize="m"
            fontWeight="m"
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.NUMBER_OF_TIME_TEST")}
          </Text>
          <Text
            fontSize="m"
            fontWeight="m"
            color={status === typeStep.pass ? "success" : "primary"}
          >
            {numberOfTime}
            <Text
              fontSize="m"
              color="grey2"
              fontWeight="m"
            >
              /{maxNumberOfTime}
            </Text>
          </Text>
        </Box>
      )
    }
    return null;
  }

  return (
    <Card
      flex
      testID="stepAdmissionTest"
      style={[
        styles.containerCard,
        {
          backgroundColor: _checkBackgroundColor(),
          borderColor: status === typeStep.pass ? colors.success : colors.white,
          borderWidth: 1
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
            imageUrl={require("assets/images/active-account/step-1.png")}
          />
        </Box>
        <Box
          flex
          style={styles.boxContent}
        >
          <Text
            center
            bold
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TITLE_STEP_1")}
          </Text>
          <Text
            center
            fontSize="m"
            style={styles.txtContent}
          >
            {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.CONTENT_STEP_1")}
          </Text>
        </Box>
        {_renderNumberOfTime()}
      </Box>
      <Box center>{_renderFooter()}</Box>
    </Card>
  );
};
export default AdmissionTest;
