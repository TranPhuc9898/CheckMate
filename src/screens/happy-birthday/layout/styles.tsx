import { Dimensions, StyleSheet } from "react-native";
import { spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  imageStyle: {
    width: width - 2*spacing.xxl,
    height: width - 2*spacing.xxl,
  }
});
