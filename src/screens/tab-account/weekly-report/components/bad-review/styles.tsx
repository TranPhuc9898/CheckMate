import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    borderColor:colors.black,
    borderWidth: 2,
    borderRadius: borderRadius.s,
    padding: spacing.m
  },
  textReview: {
    marginTop: spacing.m
  }
});
