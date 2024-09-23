import { borderRadius, colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");

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
    padding: spacing.xl,
    borderRadius: borderRadius.s,
    maxHeight: height*2/3,
    maxWidth: width - 2 * spacing.l,
    flex: 1
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
  },
  boxContent: {
    borderTopColor: colors.grey3,
    borderTopWidth: 1,
    // width: width - spacing.xxxl*3,
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
    minWidth: width/2 - 2 *spacing.xl,
    backgroundColor: colors.background,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  btnConfirm: {
    marginTop: spacing.l,
    minWidth: width/2 - 2 *spacing.xl,
  },
  dividerStyle: {
    marginHorizontal: width/6,
    marginTop: spacing.l
  },
  image: {
    width: width/1.7,
    height: width/1.7,
    marginTop: spacing.l
  },
  titleBtnStyle: {
    color: colors.secondary
  },
  txtLineHeight: {
    lineHeight: spacing.xxl,
    marginBottom: spacing.m
  },
  txtMarkDown: {
    fontSize: fontSize.xl,
    color: colors.secondary
  }
});
