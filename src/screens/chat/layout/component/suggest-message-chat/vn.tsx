import React, { useContext } from "react";

import styles from "../../styles";

import BtnSuggestMessage from "screens/chat/layout/component/button-suggest-message-chat";
// Lib
import { LocalizationContext } from "libs/context";
import { spacing } from "libs/theme";
import { Dimensions, ScrollView } from "react-native";
interface ISuggestMessageIso {
  onSend?: any;
  setShowSuggestions?: any;
}
export interface IDataSuggestion {
  name?: any;
  id?: any;
}
const SuggestMessageItem: React.FC<ISuggestMessageIso> = ({
  onSend,
  setShowSuggestions,
}) => {
  const I18n = useContext(LocalizationContext);
  const listSuggestion = [
    {
      id: 0,
      name: "CHAT.PREPARED_MESSAGE_CONFIRMATION",
    },
    {
      id: 1,
      name: "CHAT.PREPARED_MESSAGE_REQUIRE_ADDRESS_EXACTLY",
    },
    {
      id: 2,
      name: "CHAT.PREPARED_MESSAGE_COMING",
    },
    {
      id: 3,
      name: "CHAT.PREPARED_MESSAGE_WAIT_20_MINUTES",
    },
    {
      id: 4,
      name: "CHAT.PREPARED_MESSAGE_WAITED_20_MINUTES",
    },
    {
      id: 5,
      name: "CHAT.PREPARED_MESSAGE_AT_RECEPTION",
    },
    {
      id: 6,
      name: "CHAT.PREPARED_MESSAGE_THANK",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        maxHeight: Dimensions.get("window").height / 3.5,
        marginTop: spacing.m,
      }}
      contentContainerStyle={{
        paddingBottom: spacing.xxxl,
      }}
    >
      {listSuggestion.map((item: IDataSuggestion, index) => {
        let styleItem = {};
        if (index > 0 && index < listSuggestion.length) {
          styleItem = styles.wrap_suggestionsBetween;
        }
        return (
          <BtnSuggestMessage
            key={index}
            textSuggest={I18n.t(item.name)}
            onSend={onSend}
            style={styleItem}
            setShowSuggestions={setShowSuggestions}
          />
        );
      })}
    </ScrollView>
  );
};

export default SuggestMessageItem;
