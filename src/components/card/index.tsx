import { ViewProps, View } from "react-native";
import styles from "./styles";
interface ICard extends ViewProps {
  flex?: boolean;
}

/**
 * UI card, đã có bóng mờ
 */
const Card: React.FunctionComponent<ICard> = (props) => {
  return (
    <View
      testID={props?.testID}
      style={[styles.container, props.style, props.flex && { flex: 1 }]}
    >
      {props.children}
    </View>
  );
};

export default Card;
