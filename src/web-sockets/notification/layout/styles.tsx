import { colors } from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerBtnNotify: {
    flex: 1,
    marginBottom: spacing.l
  },
  boxBtnNotify: {
    flex: 1,
    paddingHorizontal: spacing.m,
  },
  titleStyleBtnNotify: {
    color: colors.secondary,
  },
  buttonStyleBtnNotify: {
    borderWidth: 1,
    borderColor: colors.secondary,
    margin: spacing.l,
  },
  headerContainer: {
    paddingTop: spacing.xxl,
  },
  txtContent: {
    paddingHorizontal: spacing.l
  },
  btnStyle: {
    marginHorizontal: spacing.l
  }
});
