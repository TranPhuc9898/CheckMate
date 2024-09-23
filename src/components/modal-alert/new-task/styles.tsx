import { borderRadius, colors, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
  },
  containerContent: {
    backgroundColor: colors.background,
    padding: spacing.xxxl,
    borderRadius: borderRadius.s,
    width: Dimensions.get("window").width - spacing.xxxl,
    paddingVertical: spacing.xxl,
  },
  containerAction: {
    marginTop: spacing.l,
  },
  leftButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingVertical: spacing.l,
    marginRight: spacing.m,
  },
  rightButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.l,
    marginLeft: spacing.m,
  },
  headerBell: {
    position: "absolute",
    top: -35,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    borderWidth: spacing.s,
    borderColor: colors.white,
    // padding: spacing.m,
  },
  title: {
    paddingTop: spacing.l
  },
  boxContent: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    width: Dimensions.get("window").width - spacing.xxxl*3,
  },
  txtDistrict: {
    paddingVertical: spacing.l,
  },
  lottieBell: {
    width: 60,
    height: 60,
  }
});
