import PriceVN from "./vi";
import PriceTH from "./th";
import PriceID from "./id";
import PriceEN from "./en";
import { VI, TH, EN, ID } from "libs/constants";
import { getIsoCodeGlobal, getLocaleGlobal } from "@src/libs/helper";
import { TextStyle, ViewStyle } from "react-native";

export interface IPrice {
  cost: number;
  currency?: string;
  priceStyle?: TextStyle;
  currencyStyle?: TextStyle;
  style?: ViewStyle;
  collapse?: boolean;
  testID?: string;
  loading?: boolean;
  type?: string;
}
const PriceItem: React.FunctionComponent<IPrice> = (props) => {
  const components = new Map([
    [VI, <PriceVN {...props} />],
    [TH, <PriceTH {...props} />],
    [ID, <PriceID {...props} />],
    [EN, <PriceEN {...props} />],
  ]);
  return components.get(getLocaleGlobal());
};
export default PriceItem;
