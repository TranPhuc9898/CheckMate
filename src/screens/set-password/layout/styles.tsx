import { Dimensions, StyleSheet } from "react-native";
import { spacing } from "@src/libs/theme";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  txtDescription: {
    textAlign: "center",
    marginBottom: spacing.xxl,
  },
  image: {
    width: Math.round((2 * width) / 2),
    height: Math.round((2 * width) / 10),
  },
});
