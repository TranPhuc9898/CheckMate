import { Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { Alert, Box, Button, TextInput } from "components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import deleteAccountAPI, { IDeleteAccountAPI } from "apis/user/delete-account";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import { logout } from "redux/slice/app-slice";
import { store } from "redux/store";

interface IChooseReasonDeleteAccount {
  setChooseReasonDeleteAccountAccount?: any;
  ChooseReasonDeleteAccountAccount?: any;
  refInput?: any;
}

const MIN_CHARACTERS_REASON = 20;

const ChooseReasonDeleteAccount: React.FC<IChooseReasonDeleteAccount> = () => {
  const I18n = useContext(LocalizationContext);
  const [reasonDeleteAccount, setReasonDeleteAccount] = useState<string | any>(
    ""
  );

  // Call API
  const _onDeleteAccount = async () => {
    // loading
    const params: IDeleteAccountAPI = {
      taskerId: getUserIdGlobal(),
      reason: reasonDeleteAccount,
    };
    // loading
    const respond: IRespond = await deleteAccountAPI(params);
    if (respond.isSuccess) {
      return Alert.alert.open({
        message: "DELETE_ACCOUNT.DELETE_ACCOUNT_SUCCESS",
        onClosed: () => {
          store.dispatch(logout());
        }
      });
    }
    return handleError(respond?.error);
  };

  const handleDeleteAccount = async () => {
    await Alert.alert.close();
    setTimeout(() => {
      return Alert.alert.open({
        message: "DELETE_ACCOUNT.ARE_YOU_SURE",
        actions: [
          {
            text: "DIALOG.BUTTON_CONFIRM",
            onPress: _onDeleteAccount,
            style: "cancel",
          },
          {
            text: "DELETE_ACCOUNT.TURN_BACK",
            style: "ok",
            onPress: () => Alert.alert.close(),
          },
        ],
      });
    }, 500);
  };

  return (
    <Box>
      <TextInput
        testID="textInputOtherReason"
        value={reasonDeleteAccount}
        onChangeText={(text) => setReasonDeleteAccount(text)}
        inputContainerStyle={styles.inputOtherReasonCancel}
        placeholder={I18n.t("DELETE_ACCOUNT.PLACEHOLDER_TEXT_INPUT", {t: MIN_CHARACTERS_REASON})}
        validType={"require"}
        multiline
        inputStyle={styles.inputStyle}
        textAlignVertical={"top"}
      />
      <Button
        testID="btnConfirm"
        title={I18n.t("DIALOG.BUTTON_CONFIRM")}
        disabled={Boolean(reasonDeleteAccount.trim().length < MIN_CHARACTERS_REASON)}
        onPress={handleDeleteAccount}
      />
    </Box>
  );
};

export default ChooseReasonDeleteAccount;
