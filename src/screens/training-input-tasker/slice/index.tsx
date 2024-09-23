import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { setLoading, getUserInfo } from "@src/redux/slice/app-slice";
import { handleError, IRespond, callSupport, popToTop, getIsoCodeGlobal } from "libs/helper";
import {
  USER_STATUS_UNVERIFIED,
  QUIZ_STATUS_PASSED,
  QUIZ_STATUS_FAILED,
} from "@src/libs/constants";
import getTrainingInputAPI from "@src/apis/training-input/get-training-quizzes";
import finishTrainingInputAPI, {
  IParams,
} from "@src/apis/training-input/finish-training-quizzes";
import { IAnswer, IRightAnswer, IQuiz } from "@src/components/quiz";
import { Alert } from "components";
import { MAX_EXECUTE_TRAINING } from "libs/helper/error-code-list";
import { store } from "redux/store";
import { phoneSupportRecruitment } from "libs/config";

interface IState {
  /**
   * Data của bài test
   */
  dataQuiz: IQuiz;
  /**
   * Hiển thị trang lỗi nếu lấy test ko về được
   */
  error: any;
  /**
   * Tasker đã làm hết số lần
   */
  isLimited: boolean;
  /**
   * Danh sách câu trả lời
   */
  dataAnswers: [IAnswer] | [];
  /**
   * Data dùng để đối chiếu câu trả lời đúng sai khi hết lần làm bài test
   */
  dataCompareAnswers: [IRightAnswer];
  /**
   * Chấp nhận làm bài test
   */
  isStart: boolean;
}

const initialState: IState = {
  dataQuiz: null,
  error: null,
  isLimited: false,
  dataAnswers: [],
  dataCompareAnswers: null,
  isStart: false,
};

const slice = createSlice({
  name: "trainingInput",
  initialState: initialState,
  reducers: {
    // Lấy thông tin bài test
    setDataQuiz: (state, action) => {
      state.dataQuiz = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDataAnswers: (state, action) => {
      state.dataAnswers = action.payload;
    },
    setDataCompareAnswers: (state, action) => {
      state.dataCompareAnswers = action.payload;
    },
    setLimited: (state, action) => {
      state.isLimited = action.payload;
    },
    setStartTest: (state, action) => {
      state.isStart = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const {
  setDataQuiz,
  setError,
  setDataAnswers,
  setDataCompareAnswers,
  setLimited,
  setStartTest,
  resetState,
} = slice.actions;

/**
 * Lấy dữ liệu bài test
 * @returns
 */
export const getDataTrainingInput =
  () => async (dispatch: any, getState: any) => {
    await dispatch(setLoading(true, null, "TRAINING_INPUT.LOADING_TITLE"));
    // Lấy thông tin user mới
    await dispatch(getUserInfo());
    
    const { app } = getState();
    // Kiểm tra điều kiện gọi API để làm test
    // Chỉ nên gọi khi user chưa active, vừa nhập OTP xong
    if (app?.user?.status !== USER_STATUS_UNVERIFIED) {
      await dispatch(setLoading(false));
      return;
    }

    // Xóa cache error nếu có
    await dispatch(setError(null));
    // Xóa cache
    await dispatch(resetState());

    const respond: IRespond = await getTrainingInputAPI();

    await dispatch(setLoading(false));

    // Đã pass rồi, không làm gì cả
    if (respond.isSuccess && respond.data.isCompletedTraining) {
      return;
    }
    // Đủ điều kiện làm bài
    if (respond.isSuccess) {
      const quizData: IQuiz = respond.data;
      dispatch(setDataQuiz(quizData));
      return;
    }
    // Quá số lần làm test
    if (respond?.error?.code === MAX_EXECUTE_TRAINING) {
      await dispatch(setLimited(true));
      return;
    }
    // Không lấy về bài test được, hiện trang báo lỗi để reload
    await dispatch(setError(respond?.error));
  };

/**
 * Xử lý kết quả của bài test
 * @param resultQuiz
 * @param dispatch
 * @returns
 */
const _processResult = async (resultQuiz, dispatch) => {
  // Rớt và quá số lần làm quy định, Đối chiếu kết quả đúng sai
  if (
    resultQuiz.status === QUIZ_STATUS_FAILED &&
    resultQuiz.numberOfExecuteLeft === 0
  ) {
    // Đối chiếu kết quả
    const rightAnswer: [IRightAnswer] = resultQuiz.rightAnswer;
    // Get phone number from setting system
    const taskerSupportPhone =
      store.getState().app?.settingSystem?.supports?.phoneRecruitment || phoneSupportRecruitment[getIsoCodeGlobal()];
    await dispatch(setDataCompareAnswers(rightAnswer));
    // Thông báo đã rớt
    Alert.alert.open(
      {
        title: "DIALOG.TITLE_ERROR",
        message: "TRAINING_INPUT.RESULT_TEST_FAILD_LIMITED",
        actions: [
          {
            testID: "btnSeeResult",
            text: "TRAINING_INPUT.SEE_RESULT",
          },
          {
            text: "DIALOG.BUTTON_CALL_SUPPORT",
            onPress: () => {
              Alert.alert.close();
              callSupport(taskerSupportPhone);
            },
            style: "cancel",
          },
        ],
      },
      true
    );
    return;
  }

  // Rớt, cho phép làm lại
  if (resultQuiz.status === QUIZ_STATUS_FAILED) {
    // Xóa những câu trả lời trước
    dispatch(setDataAnswers([]));
    // Thông báo lên số lần còn lại có thể làm
    Alert.alert.open(
      {
        testID: "btnCloseAlert",
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
      },
      true
    );
    return;
  }

  // Đậu qua bài tiếp theo
  if (
    resultQuiz.status === QUIZ_STATUS_PASSED &&
    resultQuiz.nextTrainingQuizzes
  ) {
    // Hiện trang giới thiệu bài tiếp theo
    await dispatch(setStartTest(false));
    // Xóa những câu trả lời trước
    await dispatch(setDataAnswers([]));
    // Lấy data test
    dispatch(setDataQuiz(resultQuiz.nextTrainingQuizzes));
    return;
  }

  // Đã đậu hết -> reset toàn bộ data và update user
  if (
    // resultQuiz.status === QUIZ_STATUS_PASSED &&
    resultQuiz.isCompletedTraining
  ) {
    // Xóa toàn bộ bài test
    // await dispatch(resetState());
    // Lấy lại thông tin user mới nhất
    // await dispatch(getUserInfo());
    // Thông báo làm bài test thành công
    Alert.alert.open(
      {
        message: "TRAINING_INPUT.FINISH_TEST_SUCCESS",
        actions: [
          {
            testID: "btnCloseAlert",
            text: "DIALOG.BUTTON_CLOSE",
          },
        ],
        onClosed: () => popToTop(),
      },
      true
    );
  }
};

/**
 * Nộp bài test
 * @returns
 */
export const finishTest = () => async (dispatch: any, getState: any) => {
  await dispatch(setLoading(true, null, "TRAINING_INPUT.GRADING_TEST"));
  const { trainingInput } = getState();

  // Nộp bài, chờ alert confirmed đóng
  const _onFinish = _.debounce(async () => {
    const params: IParams = {
      trainingTaskerId: trainingInput.dataQuiz?._id,
      quizzes: trainingInput.dataAnswers,
    };
    const respond: IRespond = await finishTrainingInputAPI(params);
    // Lấy thông tin user mới
    await dispatch(getUserInfo());
    await dispatch(setLoading(false));
    // Gửi bài thành công
    if (respond.isSuccess) {
      _processResult(respond.data, dispatch);
      return;
    }
    // Lỗi
    handleError(respond?.error);
  }, 1000);

  // Gọi hàm nộp bài
  _onFinish();
};

/**
 * Thoát bài test khi đã đậu hết
 * @returns
 */
export const quitTest = () => async (dispatch: any) => {
  await dispatch(setDataCompareAnswers(null));
  await dispatch(setDataQuiz(null));
  await dispatch(setLimited(true));
  await dispatch(setDataAnswers([]));
};
