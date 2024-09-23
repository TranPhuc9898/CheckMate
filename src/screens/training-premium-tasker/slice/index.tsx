import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { setLoading, getUserInfo } from "@src/redux/slice/app-slice";
import { handleError, IRespond, callSupport, getIsoCodeGlobal } from "libs/helper";
import {
  USER_STATUS_UNVERIFIED,
  QUIZ_STATUS_PASSED,
  QUIZ_STATUS_FAILED,
} from "@src/libs/constants";
import getTrainingPremiumAPI from "@src/apis/training-premium/get-training-premium-quizzes";
import finishTrainingPremiumAPI, {
  IParams,
} from "@src/apis/training-premium/finish-training-quizzes";
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
  name: "trainingPremium",
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
export const getDataTrainingPremium =
  () => async (dispatch: any, getState: any) => {
    const { app } = getState();
    // Kiểm tra điều kiện gọi API để làm test
    await dispatch(setLoading(true, null, "TRAINING_INPUT.LOADING_TITLE"));

    // Xóa cache error nếu có
    await dispatch(setError(null));

    const respond: IRespond = await getTrainingPremiumAPI();

    await dispatch(setLoading(false));

    // Đã pass rồi, không làm gì cả
    if (respond.isSuccess && respond.data.isCompletedTraining) {
      // Xóa cache
      await dispatch(resetState());
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
      // Xóa cache
      await dispatch(resetState());
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
    const taskerSupportPhone = store.getState().app?.settingSystem?.supports?.phoneRecruitment || phoneSupportRecruitment[getIsoCodeGlobal()];
    await dispatch(setDataCompareAnswers(rightAnswer));
    // Xóa toàn bộ bài test
    await dispatch(resetState());
    // Lấy lại thông tin user mới nhất
    await dispatch(getUserInfo());
    // Thông báo đã rớt
    Alert.alert.open(
      {
        title: "DIALOG.TITLE_ERROR",
        message: "TRAINING_INPUT.RESULT_TEST_FAILD_LIMITED",
        actions: [
          {
            testID: "btnSeeResult",
            text: "DIALOG.BUTTON_CLOSE",
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
  if (
    resultQuiz.status === QUIZ_STATUS_FAILED &&
    resultQuiz.numberOfExecuteLeft > 0
  ) {
    // Xóa những câu trả lời trước
    dispatch(setDataAnswers([]));
    // Thông báo lên số lần còn lại có thể làm
    Alert.alert.open(
      {
        testID: "btnCloseAlert",
        title: "DIALOG.TITLE_ERROR",
        message: {
          text: "TRAINING_INPUT.RESULT_TEST_FAILD",
          params: { t: resultQuiz.numberOfExecuteLeft },
        },
      },
      true
    );
    return;
  }

  // Đã đậu hết -> reset toàn bộ data và update user
  if (resultQuiz.status === QUIZ_STATUS_PASSED) {
    // Xóa toàn bộ bài test
    await dispatch(resetState());
    // Lấy lại thông tin user mới nhất
    await dispatch(getUserInfo());

    Alert.alert.open(
      {
        testID: "btnCloseAlert",
        title: "DIALOG.TITLE_INFORMATION",
        message: {
          text: "TRAINING_PREMIUM.PASS_TITLE",
        },
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
  const { trainingPremium } = getState();

  // Nộp bài, chờ alert confirmed đóng
  const _onFinish = _.debounce(async () => {
    const params: IParams = {
      trainingTaskerId: trainingPremium.dataQuiz?._id,
      quizzes: trainingPremium.dataAnswers,
    };
    const respond: IRespond = await finishTrainingPremiumAPI(params);
    await dispatch(setLoading(false));
    // Gửi bài thành công
    if (respond?.isSuccess) {
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
