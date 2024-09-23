import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxMainAccount: {
    marginVertical: spacing.l,
    borderColor: colors.primary2,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  boxPromotionAccount: {
    flex: 1,
    justifyContent: "space-between",
  },
  textCurrency: {
    marginLeft: spacing.s,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxl,
  },
  promotionAccountStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
});
