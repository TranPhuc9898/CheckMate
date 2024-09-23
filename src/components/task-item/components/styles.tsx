import {
  borderRadius,
  colors,
  fontSize,
  fontWeightTheme,
} from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    paddingBottom: 0,
  },
  rowStyle: {
    // paddingHorizontal: spacing.s,
    paddingBottom: spacing.s,
  },
  boxFooter: {
    alignItems: "center",
  },
  textGray: {
    color: colors.grey0,
    marginLeft: spacing.s,
  },
  iconStyle: {
    marginRight: spacing.m,
  },
  serviceTextStyle: {
    fontWeight: "500",
    fontSize: fontSize.m,
  },
  boxServiceName: {
    backgroundColor: colors.primary3,
    paddingVertical: 8,
    paddingHorizontal: spacing.m,
    borderRadius: 10,
  },
  priceStyle: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.secondary,
  },
  currencyStyle: {
    color: colors.secondary,
    fontSize: fontSize.s,
    fontWeight: fontWeightTheme.xl as any,
  },
  bottomContainer: {
    borderTopWidth: 1,
    paddingVertical: spacing.m,
    borderTopColor: colors.grey3,
  },
  bottomCancel: {
    paddingHorizontal: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey3,
    paddingBottom: spacing.s,
    marginBottom: spacing.s,
  },
  boxCancel: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.secondary3,
    borderRadius: borderRadius.s,
  },
  minHeightContainer: {
  },
  textLunaDay: {
    // textAlign: "right",
    // marginTop: spacing.s
  },
  employeeContainer: {
    alignItems: "center",
    paddingBottom: spacing.m,
    marginBottom: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey3,
  },
  boxEmployeeName: {
    marginHorizontal: spacing.m,
  },
  containerHeader: {
    marginBottom: spacing.m,
  },
  collectMoneyText: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.s,
  },
  txtToday: {
    // textAlign: "right",
    fontSize: 18,
  },
  boxCountdown: {
    backgroundColor: colors.primary3,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.s,
    padding: spacing.m,
    flexDirection: "row-reverse",
    marginTop: -spacing.s * 1.5,
    marginHorizontal: spacing.xxxl,
    marginBottom: spacing.l,
  },
  boxText: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtTime: {
    marginHorizontal: spacing.s,
  },
  boxHook: {
    position: "absolute",
    left: -spacing.l,
    top: -spacing.xxl,
  },
  iconClock: {
    marginRight: spacing.s,
  },
  imageHook: {
    width: 40,
    height: 40,
  },
  flexEnd: {
    // alignItems: "flex-end"
  },
  containerDate: {
    marginBottom: spacing.s,
  },
  txtAlignRight: {
    textAlign: "right",
    marginTop: spacing.s,
  },
  txtDay: {
    marginTop: spacing.s,
  },
  wrapRightIcon: {
    paddingTop: 2
  },
  wrapStatusTask: {
    alignItems: "flex-end"
  },
  boxDone: {
    backgroundColor: "#EBFFEF",
    borderWidth: 1,
    borderColor: colors.success,
  },
  txtDuration: {
    textAlign: "right",
    marginTop: spacing.s,
    fontSize: 18,
  },
});
