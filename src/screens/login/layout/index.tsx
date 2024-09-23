import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LocalizationContext } from "libs/context";
import { SHA256 } from "@src/libs/helper/sha256";
import { useSelector } from "react-redux";
import {
  Text,
  Alert,
  TextInput,
  Button,
  Box,
  Image,
  Divider,
  Icon,
  TextInputPhoneNumber,
} from "@src/components";
import styles from "./styles";
import { colors, spacing } from "libs/theme";
import {
  getVersionAppName,
  getVersionAppCode,
  getCountry,
} from "@src/libs/helper";
import { locales } from "@src/libs/config";
import { RootState } from "redux/slice";

export default function SignInScreen({ navigation, login, setLocale }) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const I18n = React.useContext(LocalizationContext);
  const { locale } = useSelector((state: RootState) => state.app);
  const phoneNumberRef = useRef(null);

  useEffect(() => {
    phoneNumberRef?.current?.focus();
  }, []);

  const showChooseLanguage = () => {
    Alert.alert.open({
      title: "CHOOSE_LANGUAGE.TITLE",
      message: (
        <Box>
          {locales.map((e, index) => (
            <Box key={index}>
              <Button
                testID={`language_${e}`}
                type="clear"
                title={I18n.t(`CHOOSE_LANGUAGE.${e.toUpperCase()}`)}
                titleStyle={{
                  color: Boolean(e === locale)
                    ? colors.secondary
                    : colors.black,
                }}
                onPress={() => {
                  setLocale(e);
                  // Đóng alert chọn ngôn ngữ
                  Alert.alert.close();
                }}
              />
              <Divider />
            </Box>
          ))}
        </Box>
      ),
      actions: null,
    });
  };

  const country = getCountry();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.boxContainer}
      >
        <Box flex>
          {/* View : Choose language */}
          <Box
            row
            style={styles.boxFooter}
          >
            <Box>
              <TouchableOpacity
                testID="ChooseCountry"
                onPress={() => navigation.navigate("ChooseCountry")}
              >
                <Box
                  row
                  between
                  alignCenter
                >
                  <Image
                    source={country.flag}
                    style={styles.imageFlag}
                  />
                  <Text
                    bold
                    color="black"
                    numberOfLines={1}
                  >
                    {I18n.t(country.key)}
                  </Text>
                  <Icon
                    name="down"
                    color="black"
                  />
                </Box>
              </TouchableOpacity>
            </Box>
            <Box>
              <TouchableOpacity
                testID={"chooseLanguage"}
                onPress={() => showChooseLanguage()}
              >
                <Box
                  row
                  between
                  alignCenter
                >
                  <Icon
                    style={styles.iconLanguage}
                    name="logoLanguage"
                    color="black"
                    size="xl"
                  />
                  <Box style={styles.boxTxtLanguage}>
                    <Text
                      bold
                      color="black"
                      numberOfLines={1}
                    >
                      {I18n.t(`CHOOSE_LANGUAGE.${locale.toUpperCase()}`)}
                    </Text>
                  </Box>
                  <Icon
                    name="down"
                    color="black"
                  />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>

          {/* View : Logo  */}

          <Box style={styles.boxLogoView}>
            <Box
              row
              center
            >
              <Box style={styles.boxImageBee}>
                <Image
                  source={require("@src/assets/images/logo.png")}
                  resizeMode="contain"
                  style={styles.imageBee}
                />
              </Box>

              <Box style={styles.boxText}>
                <Box style={{ marginBottom: 5 }}>
                  <Text
                    style={styles.fontSize}
                    bold
                    color="primary"
                  >
                    {I18n.t("HOME.BTASKEE")}
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontSize="m"
                    bold
                    color="secondary"
                  >
                    {I18n.t("LOGIN.TASKER_APP")}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* View : Input Phone Password    */}

          <Box style={[styles.boxInput]}>
            <Box>
              <TextInputPhoneNumber
                forwardedRef={phoneNumberRef}
                label={I18n.t("LOGIN.USERNAME")}
                placeholder={I18n.t("LOGIN.USERNAME")}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                color="black"
                validType="required"
                testID="TextInputPhone"
                keyboardType={"numeric"}
              />
              <TextInput
                showEyeIcon
                label={I18n.t("LOGIN.PASSWORD")}
                placeholder={I18n.t("LOGIN.PASSWORD")}
                value={password}
                onChangeText={setPassword}
                color="black"
                testID="TextInputPassword"
                maxLength={12}
                validType="required"
              />
              {/* Register, forgot password */}
              <Box style={styles.btnForgotPassword}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text
                    testID="btnForgotPassword"
                    bold
                    color="primary"
                  >
                    {I18n.t("LOGIN.FORGOT_PASSWORD")}
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box style={styles.boxBtnLogin}>
                <Button
                  testID="BtnLogin"
                  title={I18n.t("LOGIN.BUTTON_LOGIN")}
                  onPress={() => {
                    login({
                      phone: phoneNumber,
                      password: SHA256(password),
                      countryCode: country.countryCode,
                    });
                  }}
                  disabled={Boolean(!phoneNumber || !password)}
                />
              </Box>
              {/* View : Register or Already account */}
              <Box style={{ paddingTop: spacing.xl }}>
                <Box
                  row
                  center
                >
                  <Box>
                    <Text> {I18n.t("INTRO_APP.ALREADY_ACCOUNT")} </Text>
                  </Box>
                  <Box style={styles.btnRegister}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Register")}
                    >
                      <Text
                        testID={"btnNextToRegister"}
                        bold
                        color="primary"
                      >
                        {I18n.t("REGISTER.BUTTON_REGISTER")}
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
      <Box
        row
        center
        style={styles.footer}
      >
        <Text
          style={{ marginRight: spacing.l }}
          fontSize="s"
          color="primary"
        >
          {I18n.t("LOGIN.VERSION", { t: getVersionAppName() })}
        </Text>
        <Text
          fontSize="s"
          color="primary"
        >
          {I18n.t("LOGIN.BUILD_NUMBER", { t: getVersionAppCode() })}
        </Text>
      </Box>
    </ScrollView>
  );
}
