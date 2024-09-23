import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Text,
  TextInput,
  Button,
  Icon,
  Image,
  Alert,
} from "components";
import { LocalizationContext } from "libs/context";

//styles
import styles from "./styles";
import { checkPassword, IRespond, handleError } from "libs/helper";
import setPasswordAPI from "apis/password/set-password";
import { SHA256 } from "@src/libs/helper/sha256";
import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import { spacing } from "libs/theme";
import { TouchableOpacity } from "react-native";
const SetPassword = (props: any, navigation) => {
  // Hook
  const dispatch = useDispatch();
  const passwordRef = React.useRef();
  const [isShowPass, setShowPass] = useState<boolean>(false);

  const [password, setPassword] = useState<any>("");
  // Initialize ref

  // Check error Value TextInPut

  useEffect(() => {
    setTimeout(() => {
      passwordRef?.current?.focus();
    }, 1000);
  }, []);

  // Call Api
  const _setPassword = async () => {
    if (checkPassword(password)) {
      return null;
    }
    // Loading
    await store.dispatch(setLoading(true));
    const params = {
      taskerId: props?.route?.params?.respond?.userId,
      password: SHA256(password),
    };
    const respond: IRespond = await setPasswordAPI(params);
    // Loading
    await store.dispatch(setLoading(false));
    if (!respond?.isSuccess) {
      return handleError(respond?.error);
    }
    return dispatch(loginSuccess(respond.data));
  };

  const I18n = useContext(LocalizationContext);
  return (
    <Container isFullScreen>
      <Card>
        <Box>
          <Text
            style={styles.txtDescription}
            color="primary"
            fontSize="xl"
          >
            {I18n.t("SET_PASSWORD.DESCRIPTION")}
          </Text>
          {/* Nhập Password */}
          <TextInput
            autoFocus={true}
            autoCapitalize={"none"}
            editable={true}
            label={I18n.t("SET_PASSWORD.NEW_PASSWORD")}
            testID="setPasswordInput"
            placeholder={I18n.t("SET_PASSWORD.NEW_PASSWORD")}
            value={password}
            //Text
            onChangeText={(text) => setPassword(text)}
            forwardedRef={passwordRef}
            validType="required password"
            maxLength={12}
            secureTextEntry={isShowPass}
            rightIcon={
              <TouchableOpacity
                onPress={() => setShowPass(!isShowPass)}
                style={{ paddingRight: spacing.m }}
              >
                <Icon
                  name={isShowPass ? "eyeSlash" : "eyeOpen"}
                  size="m"
                  color={"grey0"}
                />
              </TouchableOpacity>
            }
            containerStyle={{ paddingHorizontal: 0 }}
          />
          {/* Set lại Password */}
          <Button
            testID="btnSaveNewPassword"
            title={I18n.t("SET_PASSWORD.SAVE")}
            onPress={_setPassword}
            disabled={Boolean(checkPassword(password))}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default SetPassword;
