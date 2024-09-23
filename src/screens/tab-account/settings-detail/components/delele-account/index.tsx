import styles from "./styles";
import { TouchableOpacity } from "react-native";
import React, { FunctionComponent } from "react";
import { Text, Icon, Box } from "@src/components";
import { isAndroid, navigateTo } from "libs/helper";
import { LocalizationContext } from "@src/libs/context";
interface IDeleteAccount {
  logout?: any;
}

const DeleteAccount: FunctionComponent<IDeleteAccount> = () => {
  const I18n = React.useContext(LocalizationContext);

  // Nếu android -> return null
  if (isAndroid) {
    return null;
  }

  return (
    <TouchableOpacity
      testID="btnDeleteAccount"
      onPress={() => {
        navigateTo("DeleteAccountScreen");
      }}
    >
      <Box
        row
        center
      >
        <Icon
          size="l"
          name="trash"
          color="secondary1"
        />
        <Text
          fontSize="l"
          color="secondary1"
          style={styles.textLogout}
        >
          {I18n.t("TAB_ACCOUNT.LABEL_DELETE_ACCOUNT")}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default DeleteAccount;
