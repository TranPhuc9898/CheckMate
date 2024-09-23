import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

export const COLOR_PLACEHOLDER = colors.grey2;
export const COLOR_SELECTION = colors.primary2;

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },
  boxNote: {
    marginTop: spacing.l,
  },
  textCurrency: {
    marginLeft: spacing.s,
  },
  textAmount: {
    marginTop: spacing.s,
    marginBottom: spacing.l,
  },
  textMinPayout: {
    marginLeft: spacing.s,
  },
  currencyStyle: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: fontSize.l,
  },
  priceStyle: {
    fontWeight: "bold",
    color: colors.primary,
  },
  boxPrice: {
    marginLeft: spacing.s,
  },
  boxButton: {
    justifyContent: "space-between",
    paddingTop: spacing.l,
    flex: 1,
  },
  boxMainAccount: {
    borderColor: colors.primary2,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxl,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxl,
  },
  boxAccount: {
    marginTop: spacing.xl,
    borderColor: colors.primary2,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxl,
  },
  textUserName: {
    paddingVertical: spacing.m,
  },
  textSuccess: {
    paddingVertical: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.s,
    borderColor: colors.primary2,
    padding: spacing.l,
    fontSize: fontSize.xxl,
    marginBottom: spacing.xl,
    // width: "55%",
  },
  inputText: {
    fontSize: fontSize.xxl,
  },
  containerMainAccount: {
    marginBottom: spacing.l,
  },
  txtMoneyPayout: {
    paddingVertical: spacing.s,
  },
  txtNumberDefault: {
    // paddingBottom: spacing.s
  },
});
