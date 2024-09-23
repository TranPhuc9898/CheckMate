/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-11-09 12:01
 * @modify date 2022-11-09 12:01
 * @desc [Quizz]
 * User xem video trước thì mới làm bài test
 */

import React, { Component, useState } from "react";
import { FlatList } from "react-native";
import { Box } from "components";
import Video from "./video";

import Item from "./item";

export interface IQuiz {
  _id: string;
  question: string;
  answers: [string];
}

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

export interface IRightAnswer {
  /**
   * _id của câu hỏi
   */
  _id: string;
  /**
   * Index của câu trả lời đúng
   */
  rightAnswer: [number];
}

interface IProps {
  /**
   * Data câu trả lời đã được chọn
   */
  defaultDataAnswer?: [IAnswer] | Array<{}>;
  /**
   * danh sách câu hỏi
   */
  quizzes: [IQuiz] | Array<{}>;
  /**
   * Hàm chọn câu trả lời
   */
  handledChoiceAnswer?: (e: any) => void;
  /**
   * Danh sách các câu trả lời đúng để rà soát
   */
  compareAnswers: [IRightAnswer] | Array<{}>;

  /**
   * Danh sách bài test bằng video, nhưng chỉ sử video đầu tiên
   */
  videos: [];
}
/**
 * ### Props
 * - defaultDataAnswer
 * - quizzes
 * - compareAnswers
 * - handledChoiceAnswer
 * ### Method
 * - getResult
 */
const Quiz = ({
  defaultDataAnswer,
  quizzes,
  compareAnswers,
  handledChoiceAnswer,
  videos,
}: IProps) => {
  const [dataAnswer, setDataAnswer] = useState(defaultDataAnswer || []);

  const _handledChoiceAnswer = (quizId, selectedIndexAnswer) => {
    const selectedValue: IAnswer = defaultDataAnswer.find(
      (e) => e._id === quizId
    );
    let dataAnswerTemp: Array<IAnswer | []> = Object.assign(
      [],
      defaultDataAnswer
    );
    const dataChoice: IAnswer = {
      _id: quizId,
      choice: [selectedIndexAnswer], // index of Answers
    };
    // Đã chọn và thay đổi câu trả lời
    if (selectedValue) {
      // Xóa câu trả lời cũ này đi
      dataAnswerTemp = dataAnswerTemp.filter((e) => e._id !== quizId);
    }
    dataAnswerTemp.push(dataChoice);
    setDataAnswer(dataAnswerTemp);

    handledChoiceAnswer && handledChoiceAnswer(dataAnswerTemp);
  };

  const _getChoice = (quizId) => {
    let choice = [];
    const selectedValue = defaultDataAnswer.find((e) => e._id === quizId);
    if (selectedValue) {
      choice = selectedValue.choice;
    }
    return choice;
  };

  const _renderItem = ({ item, index }: { item: IQuiz; index: number }) => {
    return (
      <Item
        key={item._id}
        quiz={item} // data câu hỏi
        choice={_getChoice(item._id)} // đáp án đã chọn
        handledChoiceAnswer={_handledChoiceAnswer} // action khi chọn đáp án
        stt={index + 1} // số thứ tự
        compareAnswers={compareAnswers}
      />
    );
  };

  return (
    <Box flex>
      <FlatList
        testID="scrollQuiz"
        data={quizzes}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
        showsVerticalScrollIndicator={false}
      />
      {/* Cho bài test có hỗ trợ xem video, video này sẽ nằm trên cùng */}
      <Video data={videos} />
    </Box>
  );
};

export default Quiz;
