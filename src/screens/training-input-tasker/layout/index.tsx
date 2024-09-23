import * as React from "react";

import { LocalizationContext } from "@src/libs/context";
import {
  Container,
  Box,
  Card,
  Alert,
  Quiz,
  QuizNavigation,
} from "@src/components";
import styles from "./styles";

import Instruction from "./instruction";
import Failed from "./failed-test";
import Error from "./error";
import QuitTest from "./quit-test";

import {
  CHECK_INPUT_STATUS_TASKER_PASS,
  USER_STATUS_ACTIVE,
} from "libs/constants";
import { TRAINING_TASKER_NOT_FOUND } from "libs/helper/error-code-list";
import PassedTest from "./passed-test";

interface TrainingInputTaskerProps {
  user: any;
  dataQuiz: any;
  error: any;
  isLimited: boolean;
  dataAnswers: any;
  dataCompareAnswers: any;
  isStart: boolean;
  getDataTrainingInput: () => void;
  setStartTest: () => void;
  finishTest: () => void;
  setDataAnswers: () => void;
  quitTest: () => void;
}

const TrainingInputTasker = (props: TrainingInputTaskerProps) => {
  const I18n = React.useContext(LocalizationContext);

  React.useEffect(() => {
    props.getDataTrainingInput();
    return () => {};
  }, []);

  const _onConfirmedFinishTest = () => {
    Alert.alert.open({
      message: "TRAINING_INPUT.FINISH_TEST_CONFIRMATION",
      actions: [
        {
          testID: "btnConfirmFinishTest",
          text: "TRAINING_INPUT.FINISH",
          onPress: async () => {
            Alert.alert.close();
            // Nộp bài
            props.finishTest();
          },
        },
        {
          text: "DIALOG.BUTTON_SEE_AGAIN",
          style: "cancel",
        },
      ],
    });
  };

  const _renderContent = () => {
    // Lấy thông tin bài test bị lỗi
    if (props?.error) {
      return <Error reload={props.getDataTrainingInput} />;
    }

    // Đã làm quá số lần và rớt
    if (!props.dataQuiz && props.isLimited) {
      return <Failed />;
    }

    // Hiện giới thiệu về bài test, có nút bắt đầu
    if (props.dataQuiz && !props.isStart) {
      return (
        <Instruction
          content={props.dataQuiz?.title}
          onStart={() => props.setStartTest(true)}
        />
      );
    }

    // Hiện bài test
    if (props.dataQuiz) {
      return (
        <Box flex>
          <Quiz
            quizzes={props.dataQuiz?.quizzes}
            defaultDataAnswer={props.dataAnswers}
            compareAnswers={props.dataCompareAnswers}
            handledChoiceAnswer={props.setDataAnswers}
            videos={props.dataQuiz?.videos}
          />
          {
            // Hiện thị nút thoát bài test nếu trả lời sai quá số lần quy định
            props.dataCompareAnswers && props.dataCompareAnswers.length > 0 ? (
              <QuitTest quitTest={props.quitTest} />
            ) : (
              <QuizNavigation
                quizzes={props.dataQuiz.quizzes}
                dataAnswers={props.dataAnswers}
                title={I18n.t("TRAINING_INPUT.FINISH")}
                onFinsh={() => _onConfirmedFinishTest()}
              />
            )
          }
        </Box>
      );
    }
    return null;
  };

  // User đã làm xong test, không cần hiện
  if (
    props?.user?.status === USER_STATUS_ACTIVE ||
    props?.user?.checkInput === CHECK_INPUT_STATUS_TASKER_PASS
  ) {
    return <PassedTest />;
  }

  return (
    <Container style={styles.container}>
      <Card
        flex
        style={styles.paddingContainer}
      >
        {_renderContent()}
      </Card>
    </Container>
  );
};

export default TrainingInputTasker;
