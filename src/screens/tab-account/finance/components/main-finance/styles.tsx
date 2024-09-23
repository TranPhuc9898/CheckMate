import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

const { width } = Dimensions.get("window");
const DIAMETER = width - 2 * spacing.xl;

export default StyleSheet.create({
  linearGradient: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    borderRadius: width,
    height: width - 2 * spacing.xl,
  },
  boxContainer: {
    paddingTop: Math.round(DIAMETER/8),
  },
  boxMainAccount: {
    marginVertical: Math.round(DIAMETER/15),
  },
  boxPromotionAccount: {
    marginVertical: Math.round(DIAMETER/15),
  },
  boxOnHoldAccount: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: spacing.m,
  },
  textCurrency: {
    marginLeft: spacing.s,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxxl,
    color: colors.primary,
  },
  promotionAccountStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
    color: colors.grey0,
  },
  boxButton: {
    justifyContent: "space-around",
    paddingHorizontal: spacing.l,
  },
  boxHelp: {
    flexDirection: "row",
  },
  containerBtn: {
    paddingHorizontal: spacing.l,
  },
  btnStyle: {
    borderRadius: borderRadius.l,
  },
  btnText: {
    paddingLeft: spacing.s,
  },
  currencyStyle: {
    color: colors.grey1,
  },
  container: {
    borderRadius: DIAMETER,
    width: DIAMETER,
    height: DIAMETER,
    alignSelf: "center",
    backgroundColor: "yellow"
  },
});
