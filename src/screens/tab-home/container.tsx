import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { initData } from "../../redux/slice/app-slice";
import Layout from "./layout";

const mapStateToProps = (store) => ({
  user: store.app.user,
  trainingStep: store.app.trainingStep,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      initData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
