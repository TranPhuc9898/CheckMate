import {
  colors,
  fontSize,
  fontWeightTheme,
} from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  promotionCost: {
    color: colors.secondary,
    marginHorizontal: spacing.s,
  },
  extraMoneyCost: {
    fontWeight: "700",
    color: colors.secondary,
    marginHorizontal: spacing.s,
  },
  currencyStyle: {
    color: colors.secondary,
    fontSize: fontSize.s,
    fontWeight: fontWeightTheme.xl as any,
  },
  priceStyle: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
  },
  boxPromotion: {
    paddingBottom: spacing.m,
  },
  txtTitle: {
    marginBottom: spacing.m,
  },
});
