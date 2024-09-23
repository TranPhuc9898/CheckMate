import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from './layout';
import { setLoading } from "redux/slice/app-slice";

const mapStateToProps = (store: any) => ({
  user: store.app.user,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  setLoading
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);