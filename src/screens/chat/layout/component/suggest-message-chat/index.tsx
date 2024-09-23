import { INDONESIA, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";
import SuggestMessageTH from "./th";
import SuggestMessageVN from "./vn";
// Map IsoCode
const SuggestMessageItem = ({ onSend, setShowSuggestions }) => {
  const components = new Map([
    [VIETNAM, <SuggestMessageVN onSend={onSend} setShowSuggestions={setShowSuggestions} />],
    [THAILAND, <SuggestMessageTH onSend={onSend} setShowSuggestions={setShowSuggestions} />],
    [INDONESIA, <SuggestMessageVN onSend={onSend} setShowSuggestions={setShowSuggestions} />],
  ]);
  return components.get(getIsoCodeGlobal());
};

export default SuggestMessageItem;
