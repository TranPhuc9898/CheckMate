import React, { FC } from "react";
import _ from "lodash";

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

import QuitTest from "./quit-test";

import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";

interface TrainingPremiumTaskerProps {
  user: any;
  dataQuiz: any;
  error: any;
  isLimited: boolean;
  dataAnswers: any;
  dataCompareAnswers: any;
  isStart: boolean;
  getDataTrainingPremium: () => void;
  setStartTest: (isStart: boolean) => void;
  finishTest: () => void;
  setDataAnswers: () => void;
  quitTest: () => void;
}
const TrainingPremiumTasker: FC<TrainingPremiumTaskerProps> = ({
  error,
  user,
  dataQuiz,
  dataAnswers,
  dataCompareAnswers,
  isStart,
  getDataTrainingPremium,
  setStartTest,
  setDataAnswers,
  finishTest,
  quitTest,
}) => {
  const I18n = React.useContext(LocalizationContext);

  React.useEffect(() => {
    trackingCleverTapScreenView("Premium");
    getDataTrainingPremium();
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
            finishTest();
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
    // Hiện giới thiệu về bài test, có nút bắt đầu
    if (!isStart) {
      return (
        <Instruction
          error={error}
          getDataTrainingPremium={getDataTrainingPremium}
          dataQuiz={dataQuiz}
          onStart={() => setStartTest(true)}
          isReadyTaskerPremium={user?.isReadyTaskerPremium}
        />
      );
    }

    // Hiện bài test
    if (dataQuiz) {
      return (
        <Box flex>
          <Quiz
            quizzes={dataQuiz.quizzes}
            defaultDataAnswer={dataAnswers}
            compareAnswers={dataCompareAnswers}
            handledChoiceAnswer={setDataAnswers}
          />
          {
            // Hiện thị nút thoát bài test nếu trả lời sai quá số lần quy định
            dataCompareAnswers && dataCompareAnswers.length > 0 ? (
              <QuitTest quitTest={quitTest} />
            ) : (
              <QuizNavigation
                quizzes={dataQuiz.quizzes}
                dataAnswers={dataAnswers}
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

export default TrainingPremiumTasker;
