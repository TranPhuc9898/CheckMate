import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  containerBadge: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    margin: spacing.s,
    borderColor: colors.grey5,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    backgroundColor: colors.white,
    minHeight: 65,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  btnActive: {
    backgroundColor: colors.primary,
  },
  txtBadge: {
    textAlign: "center",
    color: colors.black,
  },
  txtBadgeActive: {
    color: colors.white,
  },
  paddingVerticalM: {
    paddingVertical: spacing.m,
  },
  txtReviewLabel: {
    marginBottom: spacing.m,
  },
  textInput: {
    backgroundColor: "#F6F6F6",
    borderRadius: borderRadius.s,
    color: colors.black,
    padding: spacing.m,
    height: 95,
  },
  containerTextInput: {
    borderColor: colors.grey5,
  },
  txtLengthOfText: {
    marginTop: -spacing.l,
    paddingLeft: spacing.s,
    marginBottom: spacing.m,
  },
  containerStar: {
    paddingTop: spacing.l,
  },
  containerOptionBadge: {
    paddingVertical: spacing.l,
  },
});
