import { ImageBackground, View } from "react-native";
import styles from "./styles";
interface ICard extends React.ComponentProps<typeof View> {
  flex?: boolean;
}

/**
 * UI card, đã có bóng mờ
 */
const Card: React.FunctionComponent<ICard> = (props) => {
  return (
    <View
      style={[styles.containerPremium, props.style, props.flex && { flex: 1 }]}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.styleBackgroundImage}
        source={require("@images/task/background-task-premium.png")}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
};

export default Card;
