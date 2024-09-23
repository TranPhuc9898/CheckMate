import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setUserInfoRegister, onRegister } from "screens/register/slice";

import Layout from "./layout";

const mapStateToProps = (store: any) => ({
  referralCode: store.register.referralCode,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      setUserInfoRegister,
      onRegister,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
