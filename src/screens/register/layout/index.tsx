/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 11:37:12
 * @modify date 2022-10-11 11:37:12
 * @desc [Register]
 */

import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SHA256 } from "@src/libs/helper/sha256";

import {
  TextInput,
  Container,
  Box,
  Text,
  Button,
  Card,
  Icon,
  TextInputPhoneNumber,
} from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import {
  getCountry,
  getLocaleGlobal,
  getPhoneNumber,
  getUsername,
  navigateTo,
  validPhoneNumber,
} from "@src/libs/helper";
import NavigationRegister from "./navigation";
import { IParamsValidateTaskerInfo } from "apis/register/validate-tasker-info";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IParamsRegister } from "apis/register/create-account";
import styles from "./styles";

/* --------------------------- Tracking CleverTap --------------------------- */
import { trackingRegisterSuccess } from "@src/libs/tracking/track-clever-tap";

const SignUpScreen: React.FC<{
  setUserInfoRegister: any;
  onRegister: any;
}> = ({ setUserInfoRegister, onRegister }) => {
  const I18n = React.useContext(LocalizationContext);

  // True of False referral
  const [referral, setReferral] = useState(true);
  const [viewReferral, setViewReferral] = useState(true);
  // Initialize ref
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const idNumberRef = React.useRef(null);
  const phoneNumberRef = React.useRef(null);
  const referralCodeRef = React.useRef(null);

  // Initialize useState
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [referralCode, setReferralCode] = React.useState("");

  // Get country state
  const country = getCountry();

  React.useEffect(() => {
    setTimeout(() => {
      usernameRef?.current?.focus();
    }, 1000);
  }, []);

  // Check disable button
  const checkDisable = () => {
    if (
      !username.trim() ||
      !password.trim() ||
      !idNumber.trim() ||
      !validPhoneNumber(phoneNumber.trim(), country.countryCode) ||
      viewReferral
    ) {
      return true;
    }
    return false;
  };

  // API Register
  const handleRegisterAPI = async () => {
    // Check empty
    if (checkDisable()) {
      return;
    }
    const phone = getPhoneNumber(phoneNumber, country.countryCode);
    let userInfo: IParamsValidateTaskerInfo = {
      idNumber: idNumber,
      name: username,
      phone: phone,
      countryCode: country.countryCode,
      password: SHA256(password),
    };

    let params: IParamsRegister = {
      username: getUsername(phoneNumber, country.countryCode),
      name: username,
      phone: phone,
      countryCode: country.countryCode,
      language: getLocaleGlobal(),
      email: null,
      password: SHA256(password),
      referralCode: referralCode,
      idNumber: idNumber,
    };
    const respond = await onRegister(params);
    if (respond) {
      // Save user info register to
      setUserInfoRegister(userInfo);
      trackingRegisterSuccess({
        phone: phone,
        name: username,
        referralCode: referralCode,
      });
      navigateTo("OTP", {
        phone: phoneNumber,
        fromForgotPassword: false,
      });
      return true;
    }
    return null;
  };

  const _renderReferral = () => {
    if (viewReferral) {
      return (
        <Box style={[styles.cardStyle]}>
          <Box row>
            <Box style={styles.boxContainer}>
              <Icon
                name="referral"
                color="secondary"
              />
            </Box>
            <Box flex>
              <Box row>
                <Text
                  bold
                  fontSize="m"
                >
                  {I18n.t("REFERRAL.TITLE")}
                </Text>
                <Box style={styles.text}>
                  <Text
                    color="grey0"
                    fontSize="m"
                  >
                    {I18n.t("REGISTER.REFERRAL_REWARD")}
                  </Text>
                </Box>
              </Box>

              <Box
                row
                style={styles.styleNoti}
              >
                <Button
                  testID="btnNo"
                  title={I18n.t("REFERRAL.NO")}
                  titleStyle={styles.txtBtnStyle}
                  size="sm"
                  onPress={() => {
                    setReferral(!referral);
                    setViewReferral(!viewReferral);
                  }}
                  buttonStyle={styles.buttonStyle}
                />
                <Box style={{ paddingLeft: 15 }}>
                  <Button
                    testID="btnYES"
                    title={I18n.t("REFERRAL.YES")}
                    size="sm"
                    onPress={() => {
                      setReferral(referral);
                      setViewReferral(!viewReferral);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <TextInput
          testID="referralCodeInput"
          forwardedRef={referralCodeRef}
          placeholder={I18n.t("REGISTER.REFERRAL_CODE_PLACEHOLDER")}
          value={referralCode}
          onChangeText={setReferralCode}
          maxLength={15}
          autoFocus={referral}
        />
      </Box>
    );
  };

  return (
    <Container isFullScreen>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={50} // đây là khoảng cách bổ sung bạn muốn đẩy lên khi bàn phím xuất hiện
      >
        <Card flex>
          <ScrollView
            testID="scrollRegister"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={styles.container}
          >
            <TextInput
              label={I18n.t("REGISTER.FULL_NAME")}
              testID="nameInput"
              forwardedRef={usernameRef}
              placeholder={I18n.t("REGISTER.FULL_NAME_PLACEHOLDER")}
              value={username}
              onChangeText={setUsername}
              validType="required"
              maxLength={50}
            />
            <TextInput
              label={I18n.t("REGISTER.ID_NUMBER")}
              testID="idNumberInput"
              keyboardType="numeric"
              forwardedRef={passwordRef}
              placeholder={I18n.t("REGISTER.ID_NUMBER_PLACEHOLDER")}
              value={idNumber}
              onChangeText={setIdNumber}
              validType="required number"
              maxLength={15}
            />
            <TextInputPhoneNumber
              label={I18n.t("REGISTER.PHONE_NUMBER")}
              testID="phoneNumberInput"
              keyboardType="numeric"
              forwardedRef={idNumberRef}
              placeholder={I18n.t("REGISTER.PHONE_NUMBER_PLACEHOLDER")}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              validType="required number phone"
              maxLength={12}
            />
            <TextInput
              showEyeIcon
              label={I18n.t("REGISTER.PASSWORD")}
              testID="passwordInput"
              forwardedRef={phoneNumberRef}
              placeholder={I18n.t("REGISTER.PASSWORD_PLACEHOLDER")}
              value={password}
              onChangeText={setPassword}
              validType="required password"
              maxLength={12}
            />
            <Box row>
              <Text
                bold
                fontSize="m"
              >
                {I18n.t("REGISTER.REFERRAL_CODE")}
              </Text>
              <TouchableOpacity
                style={styles.boxIcon}
                onPress={() => {
                  navigateTo("ReferralScreen");
                }}
              >
                <Icon
                  name="faq"
                  color="black"
                  size="m"
                />
              </TouchableOpacity>
            </Box>
            <Box style={styles.containerReferral}>{_renderReferral()}</Box>
          </ScrollView>
          <Box>
            <NavigationRegister active={0} />
            <Button
              color={"primary"}
              testID="btnNextToOTP"
              title={I18n.t("REGISTER.BUTTON_NEXT")}
              onPress={handleRegisterAPI}
              disabled={Boolean(checkDisable())}
            />
          </Box>
        </Card>
      </KeyboardAwareScrollView>
    </Container>
  );
};
export default SignUpScreen;
