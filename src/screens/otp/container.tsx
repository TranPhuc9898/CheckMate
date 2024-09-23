import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  onReSendActivateCode,
  onValidateActivationCode
} from "screens/register/slice";

import Layout from './layout';

const mapStateToProps = (store: any) => ({
  phoneNumber: store.register.phoneNumber,
  countryCode: store.app.countryCode,
  username: store.register.username
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  onReSendActivateCode,
  onValidateActivationCode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);