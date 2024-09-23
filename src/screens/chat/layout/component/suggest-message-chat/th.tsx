import React, { useContext } from "react";
import styles from "../../styles";
// Lib
import { LocalizationContext } from "libs/context";
import BtnSuggestMessage from "../button-suggest-message-chat";
// Redux
import { useSelector } from "react-redux";
import _ from "lodash";
import { gender } from "libs/config";
import { RootState } from "redux/slice";
import { ScrollView } from "react-native";

interface ISuggestMessageIso {
  onSend?: any;
  setShowSuggestions?: any;
}
const SuggestMessageItem: React.FC<ISuggestMessageIso> = ({
  onSend,
  setShowSuggestions,
}) => {
  const I18n = useContext(LocalizationContext);
  // list of Suggestion by gender
  const listSuggestionByGender = {};
  const { user } = useSelector((state: RootState) => state.app);

  listSuggestionByGender[gender.male] = [
    {
      id: 0,
      name: "CHAT.PREPARED_MESSAGE_CONFIRMATION_2",
    },
    {
      id: 1,
      name: "CHAT.PREPARED_MESSAGE_REQUIRE_ADDRESS_EXACTLY_2",
    },
    {
      id: 2,
      name: "CHAT.PREPARED_MESSAGE_COMING_2",
    },
    {
      id: 3,
      name: "CHAT.PREPARED_MESSAGE_WAIT_20_MINUTES_2",
    },
    {
      id: 4,
      name: "CHAT.PREPARED_MESSAGE_WAITED_20_MINUTES_2",
    },
    {
      id: 5,
      name: "CHAT.PREPARED_MESSAGE_AT_RECEPTION_2",
    },
    {
      id: 6,
      name: "CHAT.PREPARED_MESSAGE_THANK_2",
    },
  ];
  listSuggestionByGender[gender.female] = [
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

  let listSuggestion = listSuggestionByGender[user?.gender || gender.female];

  const _renderSuggestion = () => {
    if (_.isEmpty(listSuggestion)) {
      return null;
    }
    return listSuggestion.map((item, index) => {
      let styleItem = {};
      if (index > 0 && index < listSuggestion.length) {
        styleItem = styles.wrap_suggestionsBetween;
      }
      return (
        <BtnSuggestMessage
          key={index}
          onSend={onSend}
          style={styleItem}
          textSuggest={I18n.t(item.name)}
          setShowSuggestions={setShowSuggestions}
        />
      );
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.containerSuggestions}
      contentContainerStyle={styles.contentSuggestions}
    >
      {_renderSuggestion()}
    </ScrollView>
  );
};

export default SuggestMessageItem;
