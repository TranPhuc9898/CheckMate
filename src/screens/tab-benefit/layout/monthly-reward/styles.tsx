import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  textMoney: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
  containerQuestion: {},
  boxNote: {
    flex: 1,
    marginTop: spacing.l,
  },
  textCurrency: {
    color: colors.grey3,
    fontSize: fontSize.s,
    fontWeight: "bold",
  },
  container: {
    height: 35,
    borderColor: colors.primary1,
    borderWidth: 3,
    borderRadius: borderRadius.l,
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 2,
  },
  inner: {
    width: "100%",
    height: 25,
    borderRadius: borderRadius.l,
    backgroundColor: colors.secondary,
  },
  label: {
    justifyContent: "center",
    textAlign: "center",
  },
  containerCondition: {
    height: 200,
    marginVertical: spacing.s,
  },
  containerLevelMonthlyReward: {
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing.xxxl,
  },
  txtCurrent: {
    fontWeight: "bold",
    color: colors.primary,
  },
  txtNormal: {
    color: colors.black,
  },
  containerLoading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  imageLoading: {
    width: 50,
    height: 50,
    marginBottom: spacing.m,
  },
  boxPoint: {
    justifyContent: "space-between",
  },
  description: {
    color: "gray",
  },
  rowContainer: {
    flexDirection: "row",
  },
  box: {
    paddingRight: spacing.xxxl,
  },
  textHours: {
    backgroundColor: colors.primary2,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.l,
    borderRadius: spacing.l,
    marginTop: spacing.m,
  },
  textReward: {
    backgroundColor: colors.secondary3,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.l,
    borderRadius: spacing.l,
    marginTop: spacing.m,
  },
  textBox: {
    paddingTop: spacing.m,
  },
  containerStyle: {
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.l,
  },
  button: {
    color: colors.primary,
  },
  boxAlert: {
    marginLeft: spacing.xxl,
  },
  boxDataReward: {
    paddingTop: spacing.xl,
  },
  boxHeader: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
    justifyContent: "space-between",
  },
  boxCard: {
    paddingTop: spacing.m,
  },
  boxDataReward2: {
    paddingTop: spacing.l,
  },
  boxBody: {
    paddingTop: spacing.l,
    paddingRight: spacing.l,
  },
  current: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl,
    backgroundColor: "#52C41A",
  },
  nextStep: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl,
    backgroundColor: colors.secondary,
  },
  unStep: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl,
    backgroundColor: colors.grey2,
  },
  textRewardNoti: {
    paddingTop: spacing.l,
    width: "33%",
  },
  textRewardNoti2: {
    paddingTop: spacing.l,
    paddingLeft: spacing.xl,
  },
  textRewardNoti3: {
    paddingTop: spacing.l,
  },
  boxInLine: {
    height: 30,
    borderRadius: borderRadius.l,
    overflow: "hidden",
    justifyContent: "center",
  },
  containerCurrentLevel: {
    paddingTop: spacing.m,
  },
  boxLabel: {
    paddingTop: spacing.s,
  },
  currencyStyle: {
    fontSize: fontSize.s,
    color: colors.primary,
  },
  priceStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
    color: colors.primary,
  },
  boxBackground: {
    padding: spacing.l,
    marginHorizontal: spacing.m,
    marginBottom: spacing.l,
  },
  imageBackgroundStyle: {
    borderRadius: borderRadius.s,
  },
  boxTitle: {
    paddingBottom: spacing.m,
    justifyContent: "space-between",
  },
  txtReward: {
    marginRight: spacing.s,
  },
});
