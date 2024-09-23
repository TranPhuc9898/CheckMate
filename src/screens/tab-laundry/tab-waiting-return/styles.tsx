import { borderRadius, buttonSize, colors, spacing } from "@src/libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerStyle: {
    marginTop: spacing.l,
    paddingBottom: spacing.l,
  },
  headerStyle: {
    marginBottom: spacing.l,
  },
  containerHeader: {
    backgroundColor: colors.primary1,
    paddingVertical: spacing.s,
  },
  containerDay: {
    borderWidth: 1,
    borderColor: colors.primary2,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
    marginVertical: spacing.s,
    width: 60,
  },
  btnPickToDay: {
    backgroundColor: colors.white,
    width: buttonSize.lg,
    height: 80,
    borderRadius: borderRadius.s,
    marginHorizontal: spacing.m,
    borderColor: colors.secondary,
    borderWidth: 1,
    justifyContent: "center",
  },
  txtDate: {
    paddingVertical: spacing.s,
  },
  txtNumberTask: {
    fontWeight: "600",
  },
  textLunaDay: {
    textAlign: "center",
    marginBottom: 2,
  },
  backgroundImage: {
    overflow: "hidden",
    width: width,
    height: width * 3 / 2
  },
  wrapBackground: {
    position: "absolute"
  },
  txtTitle: {
    paddingVertical: spacing.xxl,
    marginLeft: spacing.l
  },
  wrapTaskItem: {
    marginBottom: spacing.xl
  },
  wrapTaskDone: {
    backgroundColor: colors.grey5,
    borderColor: colors.success,
    borderWidth: 1
  }
});
