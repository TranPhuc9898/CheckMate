import { borderRadius, colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const SIZE_ICON_TIP = Math.round(Dimensions.get("window").width / 2.5);

export default StyleSheet.create({
  iconTip: {
    width: SIZE_ICON_TIP,
    height: SIZE_ICON_TIP,
  },
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
  headerBell: {
    position: "absolute",
    top: -55,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    borderWidth: spacing.s,
    borderColor: colors.white,
    // padding: spacing.m,
  },
  title: {
    paddingTop: spacing.xxl,
    textTransform: "uppercase",
  },
  boxContent: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    width: Dimensions.get("window").width - spacing.xxxl * 3,
  },
  txtContent: {
    paddingVertical: spacing.l,
  },
  lottieBell: {
    width: 60,
    height: 60,
  },
  btnStyles: {
    marginTop: spacing.l,
  },
  priceStyle: {
    fontSize: fontSize.xxxl,
    color: colors.success,
    fontWeight: "bold",
  },
  currencyStyle: {
    color: colors.success,
  },
  dividerStyle: {
    marginVertical: spacing.l,
  },
});
