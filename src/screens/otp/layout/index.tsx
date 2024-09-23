import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  InteractionManager,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Box, Button, Card, Container, Text, Image } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { getCountry } from "libs/helper";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { setSighUpOrLogin } from "redux/slice/app-slice";
import styles from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import _ from "lodash";

const CELL_COUNT = 4;
const TIMEOUT_RESEND_CODE = 30; // by seconds
let _intervalId = null;
const duration: number = 300;

const { width } = Dimensions.get("window");
const ValidateOTP: React.FC<{
  onReSendActivateCode: any;
  onValidateActivationCode: any;
  username?: string;
  route: any;
}> = ({
  onReSendActivateCode,
  onValidateActivationCode,
  username,
  route,
}) => {
  // animation

  const phone = route?.params?.phone;
  const widthImageFocus = Math.round(width / 3);
  const imageSize = useRef(new Animated.Value(1)).current;
  const animation = useRef(new Animated.Value(0)).current;
  let keyboardDidShowListener: any;
  let keyboardDidHideListener: any;

  const dispatch = useDispatch();
  const I18n = React.useContext(LocalizationContext);
  const [counter, setCounter] = useState(TIMEOUT_RESEND_CODE);
  const [runningCounter, setRunningCounter] = useState(true);
  const [numberOfClickResend, setNumberOfClickResend] = useState(0);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const navigation = useNavigation();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  // get country
  const country = getCountry();

  const handleFocus = (event) => {
    Animated.timing(imageSize, {
      toValue: 0.5,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setKeyboardIsShown(true);
  };

  const handleBlur = () => {
    Animated.parallel([
      Animated.timing(imageSize, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start();
    setKeyboardIsShown(false);
  };

  const animateUp = () => {
    Animated.timing(animation, {
      toValue: -widthImageFocus,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const animateDown = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  // Countdown
  function useInterval(callback: any, delay: number) {
    const savedCallback = React.useRef(null);
    React.useEffect(() => {
      savedCallback.current = callback;
    });

    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  React.useEffect(() => {
    return () => {
      if (_intervalId) {
        clearInterval(_intervalId);
        // _interval = null;
      }
    };
  }, []);

  useInterval(
    () => {
      setCounter(counter - 1);
      if (_intervalId && counter === -1) {
        clearInterval(_intervalId);
        // _interval = null;
        setRunningCounter(false);
      }
    },
    runningCounter ? 1000 : null
  );
  // End countdown

  // Bắt sự kiện mở đóng bàn phím
  useFocusEffect(
    React.useCallback(() => {
      const interaction = InteractionManager.runAfterInteractions(() => {
        // Reset get data when destroy
        keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          handleFocus
        );
        keyboardDidHideListener = Keyboard.addListener(
          "keyboardDidHide",
          handleBlur
        );
      });
      return () => {
        interaction.cancel();
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [])
  );

  useEffect(() => {
    if (keyboardIsShown) {
      animateUp();
    } else {
      animateDown();
    }
  }, [keyboardIsShown]);

  // Handle resend activate code
  const handleResendCode = (phoneNumber: string, countryCode: string) => {
    // Call api reset OTP
    onReSendActivateCode(phoneNumber, countryCode);
    // Count sending
    setNumberOfClickResend(numberOfClickResend + 1);
    setCounter(TIMEOUT_RESEND_CODE);
  };

  // Handle show countdown
  const renderCountdown = React.useMemo(() => {
    // The 3rd time resending the code will hide and check error
    if ((counter < 0 && numberOfClickResend >= 3) || route?.params?.isError) {
      return null;
    }
    // show countdown
    if (counter >= 0) {
      return (
        <Box style={{ flexDirection: "row" }}>
          <Text>{I18n.t("REGISTER.TEXT_OTP")}</Text>
          <Text
            style={styles.text}
            testID="btnCountDown"
            bold
            color="primary"
          >
            {`${counter >= 0 && counter < 10 ? `0${counter}` : counter}`}
            {"s"}
          </Text>
        </Box>
      );
    }
    // hide countdown, show button resend
    return (
      <Box row>
        <Text>{I18n.t("REGISTER.BUTTON_RESEND_CODE_1")}</Text>
        <TouchableOpacity
          testID="btnResendOTP"
          onPress={() => {
            handleResendCode(phone, country.countryCode);
          }}
        >
          <Text
            bold
            color="primary"
            style={styles.text}
          >
            {I18n.t("REGISTER.BUTTON_RESEND_CODE")}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  }, [counter, numberOfClickResend]);

  // Handle valid OTP
  // Nhận 1 param để kiểm tra rồi navigate tới Set Password Screen
  const handleValidateActivateCode = async (fromForgotPassword) => {
    if (!value || (value && value.length < 4)) {
      return;
    }
    // truyền thêm navigation để có thể navigation.replace

    await onValidateActivationCode(
      phone,
      country.countryCode,
      value,
      fromForgotPassword,
      navigation
    );
    await dispatch(setSighUpOrLogin());
  };

  return (
    <Container isFullScreen>
      <Card flex>
        <ScrollView bounces={false}>
          <Animated.View
            style={[
              styles.imageContainer2,
              { transform: [{ scale: imageSize }, { translateY: animation }] },
            ]}
          >
            <Box center>
              <Image
                source={require("@images/otp.png")}
                resizeMode="contain"
              />
            </Box>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: animation }] }}>
            <Box
              center
              style={styles.textHello}
            >
              <Text
                bold
                fontSize="l"
                color="primary"
                style={styles.title}
              >
                {I18n.t("OTP.HELLO")}{" "}
                <Text
                  bold
                  center
                  fontSize="l"
                  color="primary"
                >
                  {username || phone}
                </Text>
              </Text>
            </Box>
            <Text style={styles.description}>
              {I18n.t("OTP.INSTRUCTION_OTP", {
                t: phone,
              })}
            </Text>

            <Box>
              <Text
                style={styles.txtActivation}
                bold
              >
                {I18n.t("OTP.ACTIVATION_CODE")}
              </Text>
            </Box>
            <CodeField
              autoFocus={true}
              nativeID={"activationCode"}
              ref={ref}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              testID={"activationCode"}
              renderCell={({ index, symbol, isFocused }) => (
                <Box
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </Box>
              )}
              onFocus={animateUp}
              onBlur={animateDown}
            />
            {/* Check params isError ( Nếu nhập sai quá nhìu lần ẩn countdown */}
            <Box
              center
              style={styles.boxButton}
            >
              <Box row>{renderCountdown}</Box>
            </Box>
            <Box>
              <Button
                color={"primary"}
                testID="btnActivate"
                title={I18n.t("REGISTER.BUTTON_CONFIRM_OTP")}
                onPress={() => {
                  handleValidateActivateCode(route?.params?.fromForgotPassword);
                }}
              />
            </Box>
          </Animated.View>
        </ScrollView>
      </Card>
    </Container>
  );
};

export default ValidateOTP;
