import { Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { getUserIdGlobal } from "libs/helper";
import { spacing } from "libs/theme";
import moment from "moment";
import React, { useContext } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
interface ISuggestMessage {
  style?: StyleProp<ViewStyle>;
  textSuggest?: any;
  onSend?: any;
  setShowSuggestions?: any;
}

const BtnSuggestMessage: React.FC<ISuggestMessage> = ({
  textSuggest,
  style,
  onSend,
  setShowSuggestions
}) => {
  const I18n = useContext(LocalizationContext);

  // Send Suggest Text Socket
  const _onSend = () => {
    onSend([
      {
        _id: uuidv4(),
        text: textSuggest,
        createdAt: moment().toDate(),
        user: {
          _id: getUserIdGlobal(),
        },
      },
    ]);
    setShowSuggestions(false);
  };

  return (
    <TouchableOpacity
      style={[styles.wrap_suggestions, style]}
      onPress={_onSend}
    >
      <Text
        fontSize="l"
      >
        {textSuggest}
      </Text>
    </TouchableOpacity>
  );
};

export default BtnSuggestMessage;

const styles = StyleSheet.create({
  wrap_suggestions: {
    paddingVertical: 10,
  },
});
