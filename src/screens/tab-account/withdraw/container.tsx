import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from './layout';
import { setLoading } from "@src/redux/slice/app-slice";

const mapStateToProps = (store: any) => ({
  user: store.app.user,
  settingSystem: store.app.settingSystem,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  setLoading,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);