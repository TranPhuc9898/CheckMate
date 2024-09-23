import { borderRadius, colors, spacing } from "libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerContentFlatList: {
    paddingBottom: 100,
  },
  wrapCardLock: {
    marginTop: spacing.xxxl,
    backgroundColor: colors.grey4,
    borderColor: colors.grey1,
    borderWidth: 1,
  },
  wrapCardProcessing: {
    marginTop: spacing.xxxl,
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  wrapCardPassed: {
    marginTop: spacing.xxxl,
    borderColor: colors.success,
    borderWidth: 1,
    backgroundColor: colors.grey5
  },
  wrapBtnFilter: {
    position: "absolute",
    right: 30,
    bottom: 50,
  },
  imageCurrentLevel: {
    width: 80,
    height: 80
  },
  wrapHeader: {
    borderWidth: 1,
    margin: spacing.l,
    padding: spacing.l,
    borderRadius: borderRadius.s,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary3,
  },
  wrapContentHeader: {
    paddingLeft: spacing.l
  },
  txtTitleHeader: {
    paddingBottom: spacing.l,
    lineHeight: spacing.xl
  },
  wrapFooter: {
    justifyContent: "space-evenly",
  },
  btnStyle: {
    borderWidth: 1,
    paddingHorizontal: 0,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary3,
  },
  containerBtn: {
    marginRight: spacing.l,
    flex: 1,
  },
  txtBtn: {
    color: colors.secondary
  },
});
