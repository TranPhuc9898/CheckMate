import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.m,
  },
  contentLine: {
    paddingLeft: spacing.m,
  },
  spacingText: {
    marginVertical: spacing.s,
  },
  containerListUnit: {
    borderRadius: borderRadius.s,
    paddingBottom: spacing.s,
    backgroundColor: colors.primary3,
    paddingHorizontal:spacing.s,
    marginTop: spacing.l
  },
  containerHeader: {
    minHeight: 40,
    padding: spacing.l,
  },
  containerRecord: {
    minHeight: 40,
    padding: spacing.s,
    paddingHorizontal: spacing.l,
  },
  marginHorizontal: {
    marginHorizontal: spacing.l,
  },
  qtyStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerMargin: {
    marginTop: spacing.s,
    marginHorizontal: spacing.l,
  },
});
