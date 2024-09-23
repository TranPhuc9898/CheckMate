import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
// COMPONENT
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Icon,
  Image,
  Text,
  TextInput,
} from "components";
// LIB
import { SHA256 } from "@src/libs/helper/sha256";
import { LocalizationContext } from "libs/context";
import {
  IRespond,
  checkPassword,
  getUserIdGlobal,
  handleError,
} from "libs/helper";
import { spacing } from "libs/theme";
// STYLES
import styles from "./styles";
// CALL API
import changePasswordAPI, { IParamsChangePassword } from "apis/change-password";
// REDUX
import { logout, setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
const sizeIcon = 65;

const ChangePasswordScreen = () => {
  // Hook
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const I18n = useContext(LocalizationContext);
  const navigation = useNavigation();

  const showAlert = () => {
    // Thành công thì back ngược lại trước
    navigation.goBack();
    // Rồi hiện alert lên
    {
      Alert.alert?.open({
        message: "CHANGE_PASSWORD.SUCCESS_CHANGE_PASSWORD",
        actions: [
          {
            testID: "btnClose",
            text: "DIALOG.BUTTON_CLOSE",
            style: "close",
          },
        ],
      });
    }
  };
  const changePassword = async () => {
    // Loading
    await store.dispatch(setLoading(true));
    const params: IParamsChangePassword = {
      taskerId: getUserIdGlobal(),
      oldPassword: SHA256(password),
      newPassword: SHA256(newPassword),
    };
    const respond: IRespond = await changePasswordAPI(params);
    await store.dispatch(setLoading(false));
    if (!respond?.isSuccess) {
      return handleError(respond?.error);
    }
    return showAlert();
  };

  return (
    <Container isFullScreen>
      <Card>
        {/* --------------------------------- HEADER --------------------------------- */}
        <Box center>
          <Text
            style={styles.txtDescription}
            color="primary"
            fontSize="xl"
          >
            {I18n.t("CHANGE_PASSWORD.DESCRIPTION")}
          </Text>
        </Box>
        {/* ------------------------------- END HEADER -------------------------------- */}
        {/* ----------------------------- TEXT IN PUT ------------------------------- */}
        <Box>
          <TextInput
            showEyeIcon
            autoCapitalize={"none"}
            editable={true}
            label={I18n.t("CHANGE_PASSWORD.OLD_PASSWORD")}
            testID="txtOldPassword"
            placeholder={I18n.t("CHANGE_PASSWORD.INPUT_OLD_PASSWORD")}
            value={password}
            //Text
            onChangeText={setPassword}
            validType="required password"
            maxLength={50}
            color="grey0"
          />

          <TextInput
            showEyeIcon
            autoCapitalize={"none"}
            editable={true}
            label={I18n.t("CHANGE_PASSWORD.NEW_PASSWORD")}
            testID="txtNewPassword"
            placeholder={I18n.t("CHANGE_PASSWORD.INPUT_NEW_PASSWORD")}
            value={newPassword}
            //Text
            onChangeText={setNewPassword}
            validType="required newPassword"
            maxLength={50}
            color="grey0"
          />

          <Button
            testID="btnAcceptChangPassword"
            title={I18n.t("CHANGE_PASSWORD.ACCESS")}
            onPress={changePassword}
            disabled={Boolean(checkPassword(password) || checkPassword(newPassword))}
          />
        </Box>
        {/* ---------------------------- END TEXT IN PUT ------------------------------- */}
      </Card>
    </Container>
  );
};

export default ChangePasswordScreen;
