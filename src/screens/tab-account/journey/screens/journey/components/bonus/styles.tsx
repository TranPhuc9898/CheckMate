import { borderRadius, colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerProcessing: {
    borderRadius: 10,
    padding: spacing.l,
    marginTop: spacing.l,
    backgroundColor: colors.secondary3,
  },
  container: {
    borderRadius: 10,
    padding: spacing.l,
    marginTop: spacing.l,
    backgroundColor: colors.grey3,
  },
  txtStyle: {
    paddingTop: spacing.s,
  },
  wrapMainPrize: {
    paddingBottom: spacing.l,
  },
  wrapTxt: {
    paddingLeft: 5
  },
  iconStyle: {
    marginLeft: spacing.s
  },
  wrapPercentage: {
    marginVertical: spacing.xl,
    paddingBottom: spacing.s
  },
  dividerStyle: {
    marginBottom: spacing.m
  },
  txtPercentage: {
    position: "absolute"
  },
  wrapLabelCondition: {
    position: "absolute",
    bottom: 0
  },
  lottieTick: {
    position: "absolute",
    width: width/6,
    height: width/6
  },
  wrapRemain: {
    borderWidth: 1,
    marginTop: spacing.m,
    borderColor: colors.grey4,
    borderRadius: borderRadius.s,
  },
  wrapItemRemain: {
    padding: spacing.l,
  },
  dividerDetailStyle: {
    marginHorizontal: spacing.l
  },
  titleStyle: {
    marginBottom: spacing.m
  },
  wrapItemBonusPrize: {
    marginVertical: spacing.m
  },
  bPointStyle: {
    paddingRight: spacing.s
  },
  wrapIcon: {
    marginHorizontal: spacing.xxxl
  },
  cardStyle: {
    padding: spacing.l,
    marginTop: spacing.xxxl,
    margin: spacing.s,
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 1,
  },
  wrapDayLeft: {
    backgroundColor: colors.primary3,
    marginHorizontal: spacing.xxxl,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.l,
    marginTop: spacing.m
  },
  wrapNotReceive: {
    borderRadius: spacing.m,
    borderWidth: 1,
    borderColor: colors.success,
    padding: spacing.l,
    marginTop: spacing.l,
    backgroundColor: colors.background
  },
  txtBonusPrize: {
    paddingLeft: spacing.s,
    textDecorationLine: "underline",
  },
  txtGreyMarkDown: {
    color: colors.grey1,
    fontSize: fontSize.l
  },
  txtMarkDown: {
    fontSize: fontSize.l
  },
  wrapMission: {
    marginTop: spacing.l
  },
  paragraphStyle: {
    marginTop: 0,
    marginBottom: 0
  },
  btnStyle: {
    paddingHorizontal: spacing.xl,
    alignSelf: "flex-end"
  }
});
