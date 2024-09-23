import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Stamp } from "@src/components";
import styles from "./styles";
import { colors } from "libs/theme";
import Video from "./video";
import { LocalizationContext } from "@src/libs/context";

const sttByIndex = ["A", "B", "C", "D", "E", "F", "G"];

const QuizItem = ({
  quiz,
  stt = 1,
  handledChoiceAnswer,
  choice = [],
  onLayout,
  compareAnswers = [],
}) => {
  // Đáp án của câu hỏi này
  let rightAnswerData = null;
  const I18n = React.useContext(LocalizationContext);

  if (compareAnswers && compareAnswers.length > 0) {
    rightAnswerData = compareAnswers.find((answer) => answer._id === quiz._id);
  }
  /**
   * So sánh kết quả đúng sai
   */
  const _getSylecompareAnswers = (indexOfAnswer, isSelected) => {
    if (!rightAnswerData) {
      return {};
    }
    // Trả lời đúng
    const isRight = Boolean(
      rightAnswerData.rightAnswer.indexOf(indexOfAnswer) !== -1
    );

    // Chọn và đúng câu trả lời
    if (isSelected && isRight) {
      return {};
    }
    // Chọn và sai câu trả lời
    if (isSelected && !isRight) {
      // return styles.answerCampareWrong;
      return {};
    }
    // Không chọn và đúng câu trả lời
    if (!isSelected && isRight) {
      return styles.answerCampareRight;
    }
    // Không chọn và sai
    if (!isSelected && !isRight) {
      return {};
    }
    return {};
  };

  const renderStatusOfAnswer = (indexOfAnswer, isSelected, testID) => {
    if (!rightAnswerData) {
      return null;
    }
    const isRight = Boolean(
      rightAnswerData.rightAnswer.indexOf(indexOfAnswer) !== -1
    );
    // Đáp án đúng của câu trả lời sai
    if (!isSelected && isRight) {
      return (
        <Box style={styles.boxStamp}>
          <Stamp
            title={I18n.t("TRAINING_INPUT.CORRECT")}
            type="success"
            textStyle={{ minWidth: 46 }}
            backgroundSize="m"
            testID={`${testID}-success`}
          />
        </Box>
      );
    }
    // Đáp án sai của câu trả lời sai
    if (isSelected && !isRight) {
      return (
        <Box style={styles.boxStamp}>
          <Stamp
            title={I18n.t("TRAINING_INPUT.WRONG")}
            type="failed"
            textStyle={{ minWidth: 46 }}
            backgroundSize="m"
            testID={`${testID}-failed`}
          />
        </Box>
      );
    }
    // Câu trả lời đúng
    if (isSelected && isRight) {
      return (
        <Box style={[styles.boxStamp, styles.boxStampPass]}>
          <Stamp
            title={I18n.t("TRAINING_INPUT.CORRECT")}
            type="success"
            textStyle={{ minWidth: 46 }}
            backgroundSize="m"
            testID={`${testID}-correct`}
          />
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      style={styles.containerItem}
      onLayout={onLayout}
    >
      {/* <Box style={styles.contentStt}>
        <Text style={styles.txtStt}>{stt}.</Text>
      </Box> */}
      <Box style={styles.contentQuestion}>
        <Text style={styles.txtQuestion}>{`${stt}. ${quiz.question}`}</Text>
      </Box>
      <Box style={styles.contentAnswer}>
        {quiz.answers.map((answer, index) => {
          const isSelected = Boolean(choice.indexOf(index) !== -1);
          const styleBG = _getSylecompareAnswers(index, isSelected);
          return (
            <TouchableOpacity
              key={index}
              testID={`answer-${stt}-${sttByIndex[index]}`}
              style={[
                styles.btnAnswer,
                isSelected ? styles.btnSelected : {},
                styleBG,
              ]}
              disabled={Boolean(rightAnswerData)}
              onPress={() => handledChoiceAnswer(quiz._id, index)}
            >
              <Box>
                <Text
                  style={[
                    styles.txtAnswer,
                    isSelected ? styles.txtSelected : {},
                  ]}
                >{`${sttByIndex[index]}. ${answer}`}</Text>
                {renderStatusOfAnswer(index, isSelected, `answer-${stt}-${sttByIndex[index]}`)}
              </Box>
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuizItem;
