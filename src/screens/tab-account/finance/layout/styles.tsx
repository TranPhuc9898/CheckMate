import { spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const DIAMETER = width - 2 * spacing.xl;

export default StyleSheet.create({
  container: {
    marginTop: - DIAMETER/5
  },
});
