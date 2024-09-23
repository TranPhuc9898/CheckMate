import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getDataTrainingInput,
  setStartTest,
  setDataAnswers,
  finishTest,
  quitTest,
} from "./slice";

import Layout from "./layout";

const mapStateToProps = (store: any) => ({
  user: store.app.user,
  dataQuiz: store.trainingInput.dataQuiz,
  error: store.trainingInput.error,
  isLimited: store.trainingInput.isLimited,
  dataAnswers: store.trainingInput.dataAnswers,
  dataCompareAnswers: store.trainingInput.dataCompareAnswers,
  isStart: store.trainingInput.isStart,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getDataTrainingInput,
      setStartTest,
      setDataAnswers,
      finishTest,
      quitTest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
