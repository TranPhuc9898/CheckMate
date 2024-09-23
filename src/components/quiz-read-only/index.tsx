/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-11-09 12:01
 * @modify date 2022-11-09 12:01
 * @desc [Quizz]
 */

import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import Config from "react-native-config";
import { modeConfig } from "libs/config";
import { Box } from "components";
import { LocalizationContext } from "@src/libs/context";
import QuizNavigation from "./navigation";
import _ from "lodash";

import Item from "./item";
import { checkAnimationDisable } from "libs/helper";

export interface IAnswer {
  /**
   * _id của câu hỏi
   */
  _id: string;
  /**
   * Index của câu trả lời
   */
  choice: [number];
}

export interface IQuiz {
  _id: string;
  question: string;
  answers: [string];
}

interface IProps {
  /**
   * Data câu trả lời đã được chọn
   */
  defaultDataAnswer?: [IAnswer] | Array<{}>;
  /**
   * danh sách câu hỏi
   */
  quizzes: [IQuiz];
  /**
   * Hàm chọn câu trả lời
   */
  handledChoiceAnswer?: (e: any) => void;
  onFinsh: () => void;
}
/**
 * ### Props
 * - defaultDataAnswer: danh sách câu trả lời
 * - quizzes: Danh sách bài test
 * - handledChoiceAnswer: chọn câu trả lời
 * - onFinsh: Nộp bài
 * ### Method
 * - getResult
 */
const Quiz = ({
  defaultDataAnswer = [],
  quizzes,
  handledChoiceAnswer,
  onFinsh,
}: IProps) => {
  const I18n = React.useContext(LocalizationContext);
  // Index của bài test hiện tại
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  // Vô hiệu nút tiếp tục nếu User chưa xem hết bài test
  const [disabledButtonNext, setDisabledButtonNext] = useState(true);

  const titleButton =
    currentQuizIndex === quizzes?.length - 1
      ? I18n.t("TRAINING_INPUT.DONE")
      : I18n.t("TRAINING_INPUT.NEXT");

  const _handledChoiceAnswer = (quizId, selectedIndexAnswer) => {
    let dataAnswerTemp: Array<IAnswer | []> = Object.assign(
      [],
      defaultDataAnswer
    );
    const dataChoice: IAnswer = {
      _id: quizId,
      choice: [selectedIndexAnswer], // index of Answers
    };
    // Lưu các bài đã xem
    dataAnswerTemp.push(dataChoice);
    handledChoiceAnswer && handledChoiceAnswer(dataAnswerTemp);
  };

  const onNext = () => {
    const currentIndex = currentQuizIndex;
    // Câu cuối cùng, lưu lại kết quả và nộp bài
    if (currentQuizIndex === quizzes?.length - 1) {
      _handledChoiceAnswer(quizzes[currentQuizIndex]._id, 0);
      // Khôn cho bấm nộp tiếp theo
      setDisabledButtonNext(true);
      // Nộp bài
      onFinsh();
      return;
    }
    // Chuyển qua bài tiếp theo
    // Reset bài test hiện tại
    setCurrentQuizIndex(-1);
    setTimeout(() => {
      // Lấy bài tiếp theo
      setCurrentQuizIndex((prev) => currentIndex + 1);
      // lưu lại là đã xem, mặc định câu trả lời là 0
      _handledChoiceAnswer(quizzes[currentQuizIndex]._id, 0);
    }, 200);
    // Nút tiếp tục bị khóa lại cho bài tiếp theo
    setDisabledButtonNext(true);
  };

  if (_.isEmpty(quizzes)) {
    return null;
  }

  return (
    <Box flex>
      {/* Nội dung bài test */}
      <Box flex>
        {currentQuizIndex > -1 ? (
          <Animatable.View
            animation={checkAnimationDisable() ? null : "fadeInLeft"}
            useNativeDriver
            duration={700}
            style={{ flex: 1 }}
          >
            <Item
              quiz={quizzes[currentQuizIndex]}
              currentIndex={currentQuizIndex}
              setDisabledButtonNext={setDisabledButtonNext}
            />
          </Animatable.View>
        ) : (
          <Box flex />
        )}
      </Box>
      {/* Các action back và next */}
      <QuizNavigation
        quizzes={quizzes}
        dataAnswers={defaultDataAnswer}
        title={titleButton}
        disabled={disabledButtonNext}
        onFinsh={() => onNext()}
      />
    </Box>
  );
};

export default Quiz;
