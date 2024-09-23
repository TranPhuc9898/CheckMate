import React, { useEffect } from "react";
import {
  Text,
  TextInputPhoneNumber,
  Button,
  Container,
  Box,
  Card,
  Alert,
} from "@src/components";
import { LocalizationContext } from "@src/libs/context";
// Styles
import styles from "./styles";
// Libs
import {
  getCountry,
  getPhoneNumber,
  handleError,
  IRespond,
  navigateTo,
  validPhoneNumber,
} from "libs/helper";
// API
import forgotPasswordAPI from "apis/password/forgot-password";
import { IParamsForgotPassword } from "apis/password/forgot-password";
import { MAX_SMS_RESEND_ACTIVATION } from "libs/constants";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";

export default function ForgotPasswordScreen({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const country = getCountry();
  const I18n = React.useContext(LocalizationContext);

  // Initialize useState
  const phoneRef = React.createRef();

  const checkDisable = () => {
    if (!validPhoneNumber(phone.trim(), country.countryCode)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setTimeout(() => {
      phoneRef?.current?.focus();
    }, 1000);
  }, [])
  

  const checkForgotPassword = async () => {
    if (checkDisable()) {
      return;
    }
    const params: IParamsForgotPassword = {
      phone: getPhoneNumber(phone?.trim(), country.countryCode),
      countryCode: country.countryCode,
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api
    const respond: IRespond = await forgotPasswordAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    // //isSuccess
    if (respond?.isSuccess) {
      return navigation.replace("OTP", { phone: phone, fromForgotPassword: true });
    }
     //  isError : truyền 1 biến để nhận biết error để hide resend OTP
      // Nếu số điên thoai quá giới hạn số lần gửi thì hide resend
    if (respond?.error?.code === MAX_SMS_RESEND_ACTIVATION) {
      return Alert.alert?.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: (
          <Box center>
            <Text>{I18n.t("OTP.RESEND_CODE_ERROR")}</Text>
          </Box>
        ),
        actions: [
          {
            text: "DIALOG.BUTTON_CLOSE",
            type: "close",
            onPress: async () => {
              Alert.alert.close();
              navigateTo("OTP", { isError: true, phone: phone });
            },
          },
        ],
      }); 
    }
    return handleError(respond?.error);
  };

  return (
    <Container isFullScreen>
      <Card flex>
        <Box flex>
          <Text
            style={styles.txtDescription}
            color="primary"
            fontSize="xl"
          >
            {I18n.t("FORGOT_PASSWORD.DESCRIPTION")}
          </Text>
          <TextInputPhoneNumber
            testID="txtInputPhoneNumber"
            label={I18n.t("LOGIN.USERNAME")}
            placeholder={I18n.t("LOGIN.USERNAME")}
            value={phone}
            onChangeText={setPhone}
            validType="required number phone"
            forwardedRef={phoneRef}
            maxLength={12}
            keyboardType="numeric"
          />
          <Button
            testID="btnResendPassword"
            title={I18n.t("FORGOT_PASSWORD.RESEND_PASSWORD")}
            onPress={() => {
              checkForgotPassword();
            }}
            disabled={Boolean(checkDisable())}
          />
        </Box>
      </Card>
    </Container>
  );
}
