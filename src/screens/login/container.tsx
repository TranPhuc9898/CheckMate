import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, setLocale } from "../../redux/slice/app-slice";

import Layout from './layout';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  setLocale
}, dispatch);

export default connect(null, mapDispatchToProps)(Layout);