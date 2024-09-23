import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: borderRadius.s,
    padding: spacing.m,
  },
  iconStar: {
    marginLeft: spacing.s,
  },
  textReview: {
    marginTop: spacing.m,
  },
});
