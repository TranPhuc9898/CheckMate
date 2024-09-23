import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.s,
  },
  contentLine: {
    paddingLeft: spacing.l,
  },
  costStyle: {
    fontWeight: "bold",
  },
  currencyStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
  containerListBuy: {
    marginTop: spacing.m,
    borderRadius: borderRadius.s,
    backgroundColor: colors.primary3,
    padding: spacing.l,
  },
  padding0: {
    paddingHorizontal: 0,
  },
  container: {
    marginTop: spacing.m,
  },
  dividerStyle: {
    marginVertical: spacing.m,
  },
});
