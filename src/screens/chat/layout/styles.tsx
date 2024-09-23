import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";

import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
const SIZE_AVATAR = Math.round(width / 10);

export default StyleSheet.create({
  boxFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.grey3,
    alignItems: "center",
    marginTop: spacing.m,
    paddingTop: spacing.m
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
  containerButton: {
    marginHorizontal: 0,
    marginBottom: 0,
    paddingBottom: spacing.xxl,
  },
  containerNotes: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    paddingTop: spacing.m,
    marginTop: spacing.l,
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
    justifyContent: "center",
    marginBottom: 31,
    marginTop: spacing.l,
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
    marginVertical: spacing.l,
  },
  containerPromotion: {
    alignItems: "center",
    paddingTop: spacing.xl,
  },
  promotionCost: {
    color: colors.secondary,
    marginHorizontal: spacing.s,
  },
  promotionText: {
    color: colors.grey0,
    marginRight: spacing.s,
  },
  containerRequirement: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.l,
  },
  containerPet: {
    justifyContent: "space-between",
    alignItems: "center",
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
  currencyStyle: {
    fontSize: fontSize.s,
    color: colors.grey0,
  },
  btnBeginWork: {
    backgroundColor: colors.secondary,
  },
  iconMap: {
    width: 24,
    height: 24,
  },
  numberAcceptTaskStyle: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    marginTop: spacing.m,
    paddingTop: spacing.l,
  },
  avatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    borderRadius: SIZE_AVATAR / 2,
  },
  container: {
    flex: 1,
  },
  hello: {
    borderRadius: spacing.xxxl / 2,
    width: spacing.xxl,
    height: spacing.xxl,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  wrap_suggestionsBetween: {
    borderTopColor: colors.grey2,
    borderTopWidth: 1,
  },
  wrap_suggestions: {
    padding: 5,
  },
  btnTranslateContainer: {
    marginLeft: 54,
    marginBottom: 20,
    padding: 1,
  },
  txtMessageTranslate: {
    fontStyle: "italic",
    color: colors.black,
    marginBottom: 10,
    marginRight: 20,
  },
  wrap_iconPlus: {
    borderRadius: 30 / 2,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  boxIconSend: {
    paddingBottom: spacing.l,
  },
  composerStyle: {
    paddingTop: spacing.l,
    backgroundColor: "#F5F5F5",
    borderRadius: borderRadius.s,
    paddingLeft: spacing.l,
    multiline: true,
    paddingVertical: spacing.l,
  },
  containerIconSuggest: {
    paddingLeft: spacing.l,
  },
  listViewPropStyle: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageContainerStyle: {
    paddingBottom: spacing.xxxl,
  },
  containerSuggestions: {
    maxHeight: Dimensions.get("window").height / 3.5,
    marginTop: spacing.m,
  },
  contentSuggestions: {
    paddingBottom: spacing.xxxl,
  }
});
