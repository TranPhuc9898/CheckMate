import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getDataTrainingPremium,
  setStartTest,
  setDataAnswers,
  finishTest,
  quitTest,
} from "./slice";

import Layout from "./layout";

const mapStateToProps = (store: any) => ({
  user: store.app.user,
  dataQuiz: store.trainingPremium.dataQuiz,
  error: store.trainingPremium.error,
  dataAnswers: store.trainingPremium.dataAnswers,
  dataCompareAnswers: store.trainingPremium.dataCompareAnswers,
  isStart: store.trainingPremium.isStart,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getDataTrainingPremium,
      setStartTest,
      setDataAnswers,
      finishTest,
      quitTest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
