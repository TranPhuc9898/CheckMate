import { createSlice } from "@reduxjs/toolkit";
import { loginSuccess, setLoading } from "@src/redux/slice/app-slice";
import { getPhoneNumber, handleError, IRespond } from "libs/helper";
import { StackActions } from "@react-navigation/native";
// import api validate activation code
import validateActivationCodeAPI, {
  IParamsValidateActivationCode,
} from "apis/register/validate-activation-code";
// import api get service by city
import getServicesByCityAPI, {
  IParamsGetServiceByCity,
} from "apis/register/get-services-by-city";
// import api get working places
import getWorkingPlacesAPI from "apis/register/get-working-places";
// import api resend activation code
import resendActivationCodeAPI, {
  IParamsReSendActivationCode,
} from "apis/register/resend-activation-code";
import onRegisterAPI, { IParamsRegister } from "apis/register/create-account";
// import api send otp
import sendActivationCodeAPI from "apis/register/send-activation-code";

interface RegisterState {
  username: string;
  idNumber: string;
  phoneNumber: string;
  password: string;
  referralCode: any;
  services: any;
  allWorkingPlaces: any;
  citySelected: any;
  districtSelected: any;
}

const initialState: RegisterState = {
  username: "",
  idNumber: "",
  phoneNumber: "",
  password: "",
  referralCode: "",
  services: [],
  allWorkingPlaces: null,
  citySelected: null,
  districtSelected: null,
};

const slice = createSlice({
  name: "register",
  initialState: initialState,
  reducers: {
    // Set referral to reducer
    setReferralCode: (state, action) => {
      state.referralCode = action.payload;
    },
    // Set info user to reducer
    setUserInfoRegister: (state, action) => {
      const { name, idNumber, phone, password } = action.payload;
      state.username = name;
      state.idNumber = idNumber;
      state.phoneNumber = phone;
      state.password = password;
    },
    setChooseService: (state, action) => {
      state.services = action.payload;
    },
    setAllWorkingPlaces: (state, action) => {
      state.allWorkingPlaces = action.payload;
    },
    setCitySelected: (state, action) => {
      state.citySelected = action.payload;
    },
    setDistrictSelected: (state, action) => {
      state.districtSelected = action.payload;
    },
    resetState: () => initialState,
  },
});

export default slice.reducer;

export const {
  setReferralCode,
  setUserInfoRegister,
  setChooseService,
  setAllWorkingPlaces,
  setCitySelected,
  setDistrictSelected,
  resetState,
} = slice.actions;

// Check referral code and save to reducer
export const getAllWorkingPlaces = () => async (dispatch: any) => {
  // Show loading
  await dispatch(setLoading(true));
  // Call api login
  const respond: IRespond = await getWorkingPlacesAPI();
  // Hide loading
  await dispatch(setLoading(false));
  // Success
  if (respond?.isSuccess) {
    await dispatch(setAllWorkingPlaces(respond.data));
    return respond.isSuccess;
  }
  // Error
  return handleError(respond?.error);
};

// Check referral code and save to reducer
export const onReSendActivateCode =
  (phone: string, countryCode: string) => async () => {
    // Init params resend activation code
    const params: IParamsReSendActivationCode = {
      phone: phone,
      countryCode: countryCode,
    };

    // Call api login
    const respond: IRespond = await resendActivationCodeAPI(params);

    // Success
    if (respond?.isSuccess) {
      return respond?.isSuccess;
    }

    // Error
    return handleError(respond?.error);
  };

// Check referral code and save to reducer
export const onSendActivateCode = (params: any) => async () => {
  // Call api login
  const respond: IRespond = await sendActivationCodeAPI(params);

  // Success
  if (respond?.isSuccess) {
    return respond?.isSuccess;
  }

  // Error
  return handleError(respond?.error);
};

// Check referral code and save to reducer
export const onValidateActivationCode =
  (
    phone: string,
    countryCode: string,
    code: string,
    fromForgotPassword: any,
    navigation: any
  ) =>
  async (dispatch: any) => {
    // Init params validate activation code
    const params: IParamsValidateActivationCode = {
      phone: getPhoneNumber(phone?.trim(), countryCode),
      countryCode: countryCode,
      code: code,
    };

    // Show loading
    await dispatch(setLoading(true));

    // check OTP
    const respond: IRespond = await validateActivationCodeAPI(params);

    // Hide loading
    await dispatch(setLoading(false));

    // Success
    if (!respond?.isSuccess) {
      // Error
      return handleError(respond?.error);
    }
    // fromForgotPassword : params to navigate Set Password
    if (fromForgotPassword) {
      // replace trang SetPassword khi back ngược lại về thẳng tran ForgotPassword bỏ qua otp screen
      // truyền params respond: respond?.data để lấy taskerId
      return navigation.dispatch(
        StackActions.replace("SetPassword", { respond: respond?.data })
      );
    }
    await dispatch(resetState());
    return dispatch(loginSuccess(respond.data));
  };

// Check referral code and save to reducer
export const getServicesByCity =
  (cityName: string) => async (dispatch: any) => {
    // Init param get service bt city
    const params: IParamsGetServiceByCity = {
      city: cityName,
    };

    // Show loading
    await dispatch(setLoading(true));

    // check OTP
    const respond: IRespond = await getServicesByCityAPI(params);

    // Hide loading
    await dispatch(setLoading(false));

    // Success
    if (respond?.isSuccess) {
      return respond.data;
    }

    // Error
    return handleError(respond?.error);
  };

export const onRegister =
  (params: IParamsRegister) => async (dispatch: any) => {
    // Show loading
    await dispatch(setLoading(true));

    // check OTP
    const respond: IRespond = await onRegisterAPI(params);

    // Hide loading
    await dispatch(setLoading(false));

    // Success
    if (respond?.isSuccess) {
      return respond.data;
    }

    // Error
    return handleError(respond?.error);
  };
