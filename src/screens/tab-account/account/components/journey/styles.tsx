import { Dimensions, StyleSheet } from "react-native";
import { fontSize, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  boxReward: {
    paddingTop: spacing.m,
  },
  image: {
    width: Math.round(width / 6),
    height: Math.round(width / 6),
  },
  boxContainer: {
    paddingTop: spacing.s,
  },
  wrapImage: {
    paddingRight: spacing.s
  },
  markDownStyle: {
    fontSize: fontSize.l
  },
});
