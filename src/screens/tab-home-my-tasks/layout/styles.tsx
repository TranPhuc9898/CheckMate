import { borderRadius, colors, spacing } from "@src/libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const WIDTH_ITEM = 77;
const HEIGHT_ITEM = 90;
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
    paddingVertical: spacing.l,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
    marginVertical: spacing.s,
    width: WIDTH_ITEM,
  },
  btnPickToDay: {
    backgroundColor: colors.white,
    height: HEIGHT_ITEM,
    borderRadius: borderRadius.s,
    marginHorizontal: spacing.m,
    borderColor: colors.secondary,
    borderWidth: 1,
    justifyContent: "center",
    width: WIDTH_ITEM,
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
  btnSeeMore: {
    borderWidth: 1,
    borderColor: colors.primary2,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
    marginVertical: spacing.s,
    width: WIDTH_ITEM,
    height: HEIGHT_ITEM,
    justifyContent: "center",
    alignItems: "center"
  },
  boxSeeMore: {
    paddingVertical: spacing.s
  },
  boxNumberTaskSeeMore: {
    paddingVertical: spacing.s
  },
  txtToDay: {
    paddingHorizontal: spacing.m
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
