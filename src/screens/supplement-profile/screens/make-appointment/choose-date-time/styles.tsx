import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxLabel: {
    paddingVertical: spacing.xxl,
  },
  dividerStyle: {
    marginTop: spacing.xxxl,
  },
  backgroundPicked: {
    backgroundColor: colors.primary,
  },
  boxNote: {
    padding: spacing.l,
    backgroundColor: colors.secondary3,
    borderRadius: borderRadius.s,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  txtLink: {
    textDecorationLine: "underline",
  },
  errorDate: {
    fontStyle: "italic",
    padding: spacing.s,
  },
  btnStyle: {
    paddingTop: spacing.l,
  }
});
