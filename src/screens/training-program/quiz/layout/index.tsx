import * as React from "react";
import { ActivityIndicator } from "react-native";
import _ from "lodash";

import { Container, Card, Quiz, QuizNavigation, Alert } from "@src/components";
import { LocalizationContext } from "@src/libs/context";

import { QUIZ_STATUS_PASSED, QUIZ_STATUS_FAILED } from "libs/constants";

import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import finishTrainingQuizAPI from "apis/training-input/finish-training-quizzes";
import styles from "./styles";

const TrainingProgramQuiz = ({ navigation, route }) => {
  const I18n = React.useContext(LocalizationContext);
  const [data, setData] = React.useState(route?.params?.data || null);
  const [dataCompareAnswers, setDataCompareAnswers] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const callback = route?.params?.callback;

  if (_.isEmpty(data)) {
    return (
      <Container>
        <Card
          flex
          style={styles.container}
        >
          <ActivityIndicator size="large" />
        </Card>
      </Container>
    );
  }

  const _processResult = async (resultQuiz) => {
    // Đậu
    if (resultQuiz.status === QUIZ_STATUS_PASSED) {
      return Alert.alert.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: "TRAINING_INPUT.FINISH_TEST_SUCCESS",
        actions: [{ testID: "btnCloseAlert", text: "DIALOG.BUTTON_CLOSE" }],
        onClosed: () => navigation.goBack(),
      });
    }

    // Rớt và quá số lần làm quy định, Đối chiếu kết quả đúng sai
    if (
      resultQuiz.status === QUIZ_STATUS_FAILED &&
      resultQuiz.numberOfExecuteLeft === 0
    ) {
      // Đối chiếu kết quả
      const rightAnswer = resultQuiz.rightAnswer;
      // Get phone number from setting system
      setDataCompareAnswers(rightAnswer);
      // Thông báo đã rớt
      return Alert.alert.open(
        {
          title: "DIALOG.TITLE_ERROR",
          message: [
            {
              text: "TRAINING_INPUT.INFO_TEST",
              params: {
                t1: resultQuiz?.numberOfRightAnswers,
                t2: resultQuiz?.numberOfQuizzes,
              },
            },
            {
              text: "TRAINING_INPUT.TEST_FAILD_LIMITED",
            },
          ],
          actions: [
            {
              testID: "btnSeeResult",
              text: "TRAINING_INPUT.SEE_RESULT",
            },
          ],
        },
        true
      );
    }

    // Rớt, cho phép làm lại
    if (resultQuiz.status === QUIZ_STATUS_FAILED) {
      // Xóa những câu trả lời trước
      // Thông báo lên số lần còn lại có thể làm
      return Alert.alert.open(
        {
          title: "DIALOG.TITLE_ERROR",
          message: [
            {
              text: "TRAINING_INPUT.INFO_TEST",
              params: {
                t1: resultQuiz?.numberOfRightAnswers,
                t2: resultQuiz?.numberOfQuizzes,
              },
            },
            {
              text: "TRAINING_INPUT.RESULT_TEST_FAILD",
              params: { t: resultQuiz.numberOfExecuteLeft },
            },
          ],
          actions: [
            {
              testID: "btnTestAgain",
              text: "TRAINING_INPUT.TEST_AGAIN",
              onPress: () => {
                Alert.alert.close();
                // remove data
                setData(null);
                setTimeout(() => {
                  // set data again
                  setAnswers([]);
                  setData(route?.params?.data || null);
                }, 100);
              },
            },
            {
              testID: "btnBack",
              text: "TRAINING_INPUT.COME_BACK_LATER",
              style: "cancel",
              onPress: () => {
                Alert.alert.close();
                navigation.goBack();
              },
            },
          ],
          // onClosed: () => navigation.goBack(),
        },
        true
      );
    }
  };

  /**
   * Hoàn thành bài xem video
   */
  const onFinsh = _.debounce(async () => {
    const respond: IRespond = await finishTrainingQuizAPI({
      trainingTaskerId: data._id,
      quizzes: answers,
    });
    await store.dispatch(setLoading(false));
    // Thành công, gọi lại để làm bài kiểm tra
    if (respond.isSuccess) {
      _processResult(respond.data);
      // Làm mới lại trang chi tiết, mở khóa bài test
      callback && callback();
      return;
    }
    // error
    handleError(respond.error, navigation.goBack());
  }, 1000);

  const _onConfirmedFinishTest = () => {
    Alert.alert.open({
      message: "TRAINING_INPUT.FINISH_TEST_CONFIRMATION",
      actions: [
        {
          testID: "btnConfirmFinishTest",
          text: "TRAINING_INPUT.FINISH",
          onPress: async () => {
            await store.dispatch(setLoading(true, null, "TRAINING_INPUT.GRADING_TEST"));
            Alert.alert.close();
            // Nộp bài
            onFinsh();
          },
        },
        {
          text: "DIALOG.BUTTON_SEE_AGAIN",
          style: "cancel",
        },
      ],
    });
  };


  return (
    <Container>
      <Card flex>
        <Quiz
          quizzes={data.quizzes}
          defaultDataAnswer={answers}
          compareAnswers={dataCompareAnswers}
          handledChoiceAnswer={(e) => setAnswers(e)}
        />

        <QuizNavigation
          disabled={Boolean(dataCompareAnswers?.length > 0)}
          quizzes={data.quizzes}
          dataAnswers={answers}
          title={I18n.t("TRAINING_INPUT.FINISH")}
          onFinsh={() => _onConfirmedFinishTest()}
        />
      </Card>
    </Container>
  );
};

export default TrainingProgramQuiz;
