import {
  borderRadius,
  colors,
  fontSize,
  fontWeightTheme,
} from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginBottom: spacing.l,
  },
  cardStyle: {
    paddingBottom: spacing.s,
  },
  rowStyle: {
    paddingHorizontal: spacing.s,
    justifyContent: "space-between",
    alignContent: "center",
  },
  boxFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.grey3,
    alignItems: "center",
    paddingTop: spacing.s,
  },
  textGray: {
    color: colors.grey0,
    marginLeft: spacing.s,
  },
  iconStyle: {
    width: fontSize.xl,
    height: fontSize.xl,
    marginRight: spacing.l,
  },
  btnOptionFooter: {
    minWidth: width / 3 - 3 * spacing.l,
    minHeight: width / 3 - 3 * spacing.l,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    justifyContent: "center",
  },
  btnSeeFullNote: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.s,
    alignSelf: "flex-end",
  },
  containerAddress: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerCountdown: {
    margin: spacing.l,
    marginTop: 0,
  },
  containerCustomer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.m,
  },
  customerLabel: {
    borderRightColor: colors.grey3,
    borderRightWidth: 1,
    paddingRight: spacing.m,
    marginRight: spacing.s,
    color: colors.primary,
  },
  containerPaymentMethod: {
    justifyContent: "space-between",
    marginVertical: spacing.s,
  },
  containerPromotion: {
    alignItems: "center",
    paddingTop: spacing.xl,
  },
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
  containerRequirement: {
    marginTop: spacing.l,
  },
  containerBringTools: {
    marginTop: spacing.m,
  },
  containerBtnFAQ: {
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    marginBottom: spacing.l,
  },
  optionCallText: {
    paddingVertical: spacing.l,
    marginLeft: spacing.m,
  },
  priceStyle: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
  },
  btnBeginWork: {
    backgroundColor: colors.secondary,
  },
  numberAcceptTaskStyle: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    marginTop: spacing.m,
    paddingTop: spacing.l,
  },
  txtHeaderModal: {
    marginTop: spacing.l,
    marginBottom: spacing.s,
  },
  iconSuccess: {
    width: 64,
    height: 64,
  },
  cancelFeeTxtStyle: {
    color: colors.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeightTheme.xl as any,
  },
  containerTaskItemCancel: {
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    padding: spacing.m,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: spacing.xl,
  },
  txtCancelTaskSuccess: {
    marginTop: spacing.m,
  },
  cancelReasonTxt: {
    paddingHorizontal: spacing.xxl,
    textAlign: "center",
    paddingVertical: spacing.l,
  },
  containerCancelPolicy: {
    height: 350,
    marginVertical: spacing.s,
    marginBottom: spacing.m,
  },
  containerBtnCancel: {
    flex: 1,
    justifyContent: "space-evenly",
    marginVertical: spacing.m,
  },
  boxBtnCancel: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  titleStyleBtnCancel: {
    color: colors.secondary,
  },
  buttonStyleBtnCancel: {
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  containerContentModalChooseReason: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  txtIntroModalChooseReason: {
    paddingHorizontal: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  buttonStyleBtnChooseReason: {
    width: width - 2 * spacing.xl,
    marginBottom: spacing.s,
  },
  inputOtherReasonCancel: {
    borderColor: colors.white,
    marginVertical: spacing.xxl,
  },
  btnTranslateNote: {
    alignSelf: "flex-end",
    paddingVertical: spacing.s,
    paddingRight: spacing.s,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCloseTranslateNote: {
    backgroundColor: colors.secondary,
    marginTop: spacing.xxxl,
  },
  containerTaskNoteTranslated: {
    borderBottomColor: colors.primary,
    paddingBottom: spacing.m,
    borderBottomWidth: 1,
  },
  lineContainer: {
    marginVertical: spacing.m,
  },
  contentLine: {
    flex: 9,
  },
  textGetMoreMoney: {
    color: colors.secondary,
  },
  priceGetMoreMoneyStyle: {
    fontSize: fontSize.xxl,
    color: colors.secondary,
    fontWeight: "700",
  },
  currencyGetMoreMoneyStyle: {
    color: colors.secondary,
  },
  marginTopLarge: {
    marginTop: spacing.l,
  },
  marginHorizontalL: {
    marginHorizontal: spacing.l,
  },
  containerOption: {
    justifyContent: "space-around",
    marginBottom: spacing.l,
  },
  containerBtnDone: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
  },
  containerBtnStart: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    alignItems: "center",
  },
  image: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  boxText: {
    paddingTop: spacing.xl,
  },
  text: {
    // paddingTop:spacing.xxl
    textAlign: "center",
  },
  txtNote: {
    paddingVertical: spacing.m,
    lineHeight: 22,
  },
  boxContent: {
    marginHorizontal: spacing.m,
  },
  containerBtnMap: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.l,
  },
  lineHeight: {
    lineHeight: 22,
  },
  containerNote: {
    padding: spacing.xxl,
  },
  boxNoteTranslated: {
    paddingVertical: spacing.m,
  },
  containerModalCancel: {
    padding: spacing.l,
  },
  boxPromotion: {
    paddingBottom: spacing.s,
  },
  txtDetail: {
    paddingHorizontal: spacing.l,
  },
  qrCode: {
    borderRadius: borderRadius.s,
    borderWidth: spacing.xl,
    borderColor: colors.primary3,
    paddingVertical: spacing.l,
  },
  dividerStyle: {
    marginVertical: spacing.l,
  },
  boxAnalytic: {
    paddingVertical: spacing.s,
  },
  boxTask: {
    padding: spacing.l,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  boxTaskDetail: {
    marginTop: spacing.m,
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
  },
  priceCancelStyle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
  },
  currencyCancelStyle: {
    fontSize: fontSize.m,
    fontWeight: fontWeightTheme.xl as any,
  },
  iconTaskCancel: {
    marginRight: spacing.s,
  },
  boxItemDetailTask: {
    alignItems: "center",
    marginTop: spacing.m,
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  btnDetail: {
    paddingHorizontal: spacing.l,
  },
  lineMarginTop: {
    marginTop: spacing.m,
  }
});
