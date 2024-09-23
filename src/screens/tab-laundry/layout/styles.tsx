import { borderRadius, buttonSize, colors, fontSize, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btnStyle: {
    marginBottom: spacing.xxxl,
    marginHorizontal: spacing.l,
  },
  boxTitle: {
    marginTop: spacing.s,
  },
  currencyStyle: {
    color: colors.grey0,
    fontSize: fontSize.m,
  },
  priceStyle: {
    color: colors.grey0,
    fontSize: fontSize.m,
  },
  lineClothes: {
    paddingRight: spacing.s,
  },
  boxClothes: {
    marginVertical: spacing.s,
  },
});
