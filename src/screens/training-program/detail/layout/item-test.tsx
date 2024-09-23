import * as React from "react";
import { TouchableOpacity } from "react-native";
import {
  TRAINING_PROGRAM_PERMISSON_LOCK,
  TRAINING_PROGRAM_STATUS_PASS,
  TRAINING_PROGRAM_STATUS_FAILED,
} from "libs/constants";

import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Image, Stamp, Button, Icon } from "@src/components";
import ItemTestLocked from "./item-test-locked";

import styles from "./styles";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { getIsoCodeGlobal, openUrl } from "libs/helper";
import { phoneSupportRecruitment } from "libs/config";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

interface ItemProps {
  navigation: any;
  data: any;
  callback: (e: any) => void;
}

const Item = ({ navigation, data, callback }: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);
  const { settingSystem } = useSelector((state: RootState) => state?.app);

  // Bài kiểm tra chưa mở do chưa xem bài học
  if (data?.quizPermission === TRAINING_PROGRAM_PERMISSON_LOCK) {
    return <ItemTestLocked data={data} />;
  }

  const renderDetail = () => {
    if (
      data?.quizStatus === TRAINING_PROGRAM_STATUS_PASS ||
      data?.quizStatus === TRAINING_PROGRAM_STATUS_FAILED
    ) {
      return null;
    }
    // Đang làm dở
    return (
      <Box
        row
        alignCenter
      >
        <Text>
          {I18n.t("TRAINING_INPUT.REMAINING_TIME")}{" "}
          <Text color="secondary">{data?.numberOfExecuteLeft}</Text>
        </Text>
      </Box>
    );
  };

  const _handleSupport = () => {
    const phoneNumber = settingSystem?.supports?.phoneRecruitment || phoneSupportRecruitment[getIsoCodeGlobal()];
    if (phoneNumber) {
      return (
        <Box style={styles.boxButtonCall}>
          <Button
            size="md"
            onPress={() => openUrl(`tel:${phoneNumber}`)}
            buttonStyle={styles.buttonStyle}
          >
            <Icon
              size="l"
              name="phoneCall"
              style={styles.iconCall}
            />
            <Text
              color="white"
              fontSize="m"
              bold
            >
              {I18n.t("DIALOG.BUTTON_CALL_SUPPORT")}
            </Text>
          </Button>
        </Box>
      );
    }
    return;
  };

  const _renderStatus = () => {
    // Đậu
    if (data?.quizStatus === TRAINING_PROGRAM_STATUS_PASS) {
      return (
        <Box
          center
          testID="iconTestFailed"
          style={styles.boxStampSuccess}
        >
          <Stamp
            title={I18n.t("TRAINING_INPUT.PASS")}
            backgroundSize="xxl"
            titleSize="xxl"
          />
        </Box>
      );
    }
    // Rớt
    if (data?.quizStatus === TRAINING_PROGRAM_STATUS_FAILED) {
      return (
        <>
          <Box
            testID="iconTestPass"
            style={styles.boxStampFailed}
          >
            <Stamp
              title={I18n.t("TRAINING_INPUT.FAILED")}
              backgroundSize="xl"
              titleSize="xl"
              type="failed"
            />
          </Box>
          {_handleSupport()}
        </>
      );
    }
  };

  const _checkDisabled = () => {
    if (
      Boolean(
        data?.quizStatus === TRAINING_PROGRAM_STATUS_PASS ||
          data?.quizStatus === TRAINING_PROGRAM_STATUS_FAILED
      )
    ) {
      return true;
    }
    return false;
  };

  const _renderImage = () => {
    if (_checkDisabled()) {
      return (
        <Grayscale>
          <Image
            style={styles.image}
            source={require("@src/assets/images/training/test.png")}
          />
        </Grayscale>
      );
    }
    return (
      <Image
        style={styles.image}
        source={require("@src/assets/images/training/test.png")}
      />
    );
  };

  const _renderNumberRightAnswer = () => {
    if (data?.numberOfCorrectAnswers) {
      return (
        <Box row>
          <Text fontSize="m">
            {I18n.t("TRAINING_INPUT.NUMBER_OF_CORRECT_ANSWER")}
          </Text>
          <Text fontSize="m">
            {data?.numberOfCorrectAnswers}/ {data?.numberOfQuizzes}
          </Text>
        </Box>
      );
    }
  };

  return (
    <TouchableOpacity
      testID="btnTrainingProgramTest"
      onPress={() =>
        navigation.navigate("TrainingProgramQuiz", {
          data: data,
          callback: callback,
        })
      }
      disabled={_checkDisabled()}
    >
      <Card style={_checkDisabled() ? styles.containerDisabled : null}>
        <Box row>
          <Box
            flex
            style={styles.leftContent}
          >
            <Box>
              <Text
                fontSize="xl"
                bold
              >
                {I18n.t("TRAINING_INPUT.TEST")}
              </Text>
              <Text style={styles.txtDescription}>
                {I18n.t("TRAINING_INPUT.TEST_DESCRIPTION")}
              </Text>
            </Box>
            <Box style={styles.info}>
              {renderDetail()}
              {/* Số câu trả lời đúng */}
              {_renderNumberRightAnswer()}
            </Box>
          </Box>
          <Box center>{_renderImage()}</Box>
        </Box>
      </Card>
      {_renderStatus()}
    </TouchableOpacity>
  );
};

export default Item;
