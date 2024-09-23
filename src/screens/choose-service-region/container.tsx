import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Layout from './layout';
import { getUserInfo, getTrainingStep } from "@src/redux/slice/app-slice";
import {
  getAllWorkingPlaces,
  setCitySelected,
  setDistrictSelected,
  setChooseService,
  getServicesByCity,
} from 'screens/register/slice';

const mapStateToProps = (store: any) => ({
  allWorkingPlaces: store.register.allWorkingPlaces,
  districtSelected: store.register.districtSelected,
  citySelected: store.register.citySelected,
  services: store.register.services,
  locale: store.app.locale,
  idNumber: store.register.idNumber,
  password: store.register.password,
  phoneNumber: store.register.phoneNumber,
  referralCode: store.register.referralCode,
  username: store.register.username,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  getAllWorkingPlaces,
  setCitySelected,
  setDistrictSelected,
  setChooseService,
  getServicesByCity,
  getUserInfo,
  getTrainingStep,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);