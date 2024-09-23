import React from "react";
import { Button, Box, Text } from "@src/components";

import styles from "./styles";

interface QuizNavigationProps {
  quizzes: any;
  dataAnswers: any;
  onFinsh: () => void;
  title: string;
  disabled: Boolean;
}

const QuizNavigation = ({
  quizzes,
  dataAnswers,
  onFinsh,
  title,
  disabled,
}: QuizNavigationProps) => {
  // Số lượngc câu trả lời đúng
  const numberOfAnswer = dataAnswers.length;
  // Số lượngc câu hỏi
  const numberOfQuizzes = quizzes?.length;
  // Tính ra số % hoàn thành bài test
  const process = (numberOfAnswer / numberOfQuizzes) * 100;
  return (
    <Box
      row
      center
      style={styles.containerNavigation}
    >
      <Box flex>
        <Box style={styles.processBarContent}>
          <Box style={styles.processBar}>
            <Box
              style={[styles.processIn, { width: `${Math.round(process)}%` }]}
            />
          </Box>
          <Box style={styles.targetContent}>
            <Text
              style={styles.txtTarget}
            >{`${numberOfAnswer}/${numberOfQuizzes}`}</Text>
          </Box>
        </Box>
        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          horizontal
        >
          {quizzes.map((quiz, index) => {
            const isSelected = Boolean(
              dataAnswers.find((e) => e._id === quiz._id)
            );
            return (
              <TouchableOpacity
                key={index}
                style={styles.btnNavigationQuiz}
                onPress={() => {
                  handledGoToQuestion(index);
                }}
              >
                <Box
                  style={[
                    styles.btnNavigationQuizContent,
                    isSelected ? styles.btnNavigationQuizContentActive : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.txtNavigation,
                      isSelected ? styles.txtNavigationActive : {},
                    ]}
                  >
                    {index + 1}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
      </Box>
      <Box>
        <Button
          testID="btnFinishTest"
          size="sm"
          title={title}
          disabled={Boolean(
            quizzes?.length !== dataAnswers?.length || disabled
          )}
          onPress={() => onFinsh()}
        />
      </Box>
    </Box>
  );
};

const defaultProps = {
  quizzes: [],
  dataAnswers: [],
  handledGoToQuestion: () => {},
};

QuizNavigation.defaultProps = defaultProps;

export default QuizNavigation;
