import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.l,
  },
  contentLine: {
    paddingLeft: spacing.m,
  },
  spacingText: {
    marginVertical: spacing.s,
  },
  containerListUnit: {
    borderRadius: borderRadius.s,
    backgroundColor: colors.primary3,
    padding: spacing.s,
  },
  containerHeader: {
    minHeight: 40,
    padding: spacing.s,
    paddingTop: spacing.m,
  },
  containerRecord: {
    minHeight: 40,
    paddingVertical: spacing.m,
    marginHorizontal: spacing.l,
    borderTopColor: colors.grey2,
    borderTopWidth: 1,
  },
  txtTask: {
    textAlign: "right"
  }
});
