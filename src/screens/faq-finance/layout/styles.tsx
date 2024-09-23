import { Dimensions, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  currencyStyle: {
    color: colors.grey1,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxxl,
    color: colors.black,
  },
  holdingAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.l,
    color: colors.secondary,
  },
  holdingCurrencyStyle: {
    color: colors.secondary,
  },
  header: {
    backgroundColor: colors.white,
    // justifyContent: "space-between",

    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
  },
  headerText: {
    fontSize: fontSize.l,
    marginVertical: spacing.s,
  },
  boxHoldingTitle: {
    width: "70%",
  },
  boxAccountHolding: {
    width: "30%",
    alignItems: "center",
  },
  styleIcon: {
    position: "absolute",
    right: 0,
  },
  boxValue: {
    justifyContent: "center",
  },
  boxHolding: {
    marginTop: spacing.m,
    width: "100%",
    justifyContent: "space-between",
  },
  boxContent: {
    paddingVertical: spacing.m,
  },
  boxNote: {
    paddingTop: spacing.m,
  },
});
