import { StyleSheet } from "react-native";

import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  referralCode: {
    borderRadius: borderRadius.s,
    backgroundColor: colors.primary3,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.m,
    marginVertical: spacing.m,
  },
  btnShareReferralCode: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.xl,
    marginBottom: spacing.m,
  },
  between: {
    justifyContent: "space-between",
  },
  lineStyle: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.l,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  containerTitle: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.l,
    justifyContent: "space-around",
    marginBottom: spacing.l,
    marginHorizontal: spacing.l,
  },
  wrapTotalUser: {
    marginTop: spacing.m,
  },
});
