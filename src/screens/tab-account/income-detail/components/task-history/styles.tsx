import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  priceStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
  boxIncomeInMonth: {
    flex: 1,
    paddingTop: spacing.m,
    alignItems: "flex-end",
  },
  boxContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0
  },
  boxTaskItem: {
    marginHorizontal: 0,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
    padding: 0,
    paddingVertical: spacing.m,
  },
  boxEmptyData: {
    marginBottom: spacing.xl,
    marginTop: spacing.m,
  },
  titleStyle: {
    paddingHorizontal: spacing.l,
    color: colors.primary,
  },
  wrapHeader: {
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl
  },
  txtTop: {
    paddingBottom: spacing.m
  },
  wrapRight: {
    alignItems: "flex-end"
  },
  priceItemStyle: {
    fontSize: fontSize.xl,
    fontWeight: "700"
  },
  currencyStyle: {
    color: colors.grey1,
    fontWeight: "500",
  },
  dividerStyle: {
    marginVertical: spacing.l
  },
  btnDoneStyles: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.l,
  },
  btnCanceledStyles: {
    backgroundColor: colors.grey1,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.l,
  },
  tipStyles: {
    fontWeight: "bold",
  },
  wrapReason: {
    paddingTop: spacing.l
  },
  cancelFeeStyle: {
    fontWeight: "bold"
  },
  wrapCancelFee: {
    paddingTop: spacing.m
  }
});
