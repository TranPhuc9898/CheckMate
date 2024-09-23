import { View, StyleSheet } from "react-native";

import { Text } from "@components";
import { colors, fontSize } from "@src/libs/theme";
interface IHeader {
  title: string;
}

const HeaderAlert: React.FunctionComponent<IHeader> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text bold style={styles.defaultStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 20,
  },
  defaultStyle: {
    fontSize: fontSize.xl,
    color: colors.black,
  },
});

export default HeaderAlert;
