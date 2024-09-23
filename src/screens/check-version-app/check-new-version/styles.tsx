import { colors, spacing } from "@src/libs/theme";
import { Dimensions, StyleSheet } from "react-native";
const FLAG_SIZE = 40;
const { width } = Dimensions.get("window");
export default StyleSheet.create({
  pressLink: {
    backgroundColor: colors.secondary,
    borderRadius: spacing.m,
    padding: spacing.xl,
  },

  backgroundImageStyle: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
});
