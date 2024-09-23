import * as React from "react";
import _ from "lodash";

import { Container, Card, QuizReadOnlyWithMedia } from "@src/components";

import { TRAINING_PROGRAM_STATUS_PASS } from "libs/constants";

import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import finishTrainingAPI from "apis/training-program/finish-training-video";

const TrainingProgramVideo = ({ navigation, route }) => {
  const [data, setData] = React.useState(route?.params?.data || null);
  const [answers, setAnswers] = React.useState([]);
  const callback = route?.params?.callback;

  if (_.isEmpty(data)) {
    return <Container />;
  }

  /**
   * Hoàn thành bài xem video
   */
  const onFinsh = async () => {
    // Đã hoàn thành rồi, chỉ xem lại, không gửi API
    if (data?.videoStatus === TRAINING_PROGRAM_STATUS_PASS) {
      return navigation.goBack();
    }
    // Xem vieo và hoàn thành video lần đầu tiên
    await store.dispatch(setLoading(true));
    const respond: IRespond = await finishTrainingAPI({
      trainingTaskerId: data._id,
    });
    await store.dispatch(setLoading(false));
    // Thành công, gọi lại để làm bài kiểm tra
    if (respond.isSuccess) {
      // Làm mới lại trang chi tiết, mở khóa bài test
      if (callback) {
        callback();
        return;
      }
      navigation.goBack();
      return;
    }
    // Error
    handleError(respond.error, () => navigation.goBack());
  };

  return (
    <Container>
      <Card flex>
        <QuizReadOnlyWithMedia
          quizzes={data.videos}
          defaultDataAnswer={answers}
          handledChoiceAnswer={(e) => setAnswers(e)}
          onFinsh={onFinsh}
        />
      </Card>
    </Container>
  );
};

export default TrainingProgramVideo;
