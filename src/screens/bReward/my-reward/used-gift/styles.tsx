import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  txtBranchName: {
    marginTop: spacing.s,
  },
  container: {
    paddingHorizontal: 0,
  },
  slide: {
    backgroundColor: colors.grey6,
    borderRadius: spacing.l,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.0,
    elevation: 0.5,
    marginBottom: spacing.xl,
    minHeight: 120,
    justifyContent: "center",
  },
  wrapIcon: {
    paddingTop: 12,
    paddingBottom: spacing.l,
    backgroundColor: colors.grey4,
    paddingHorizontal: spacing.l,
    borderRadius: borderRadius.l,
    marginRight: spacing.s,
    marginLeft: spacing.m,
  },
  wrapImage: {
    marginRight: spacing.m,
    marginLeft: spacing.m,
    borderRadius: borderRadius.xs,
    overflow: "hidden",
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  wrapSpacing: {
    marginRight: spacing.xl,
  },
  boxSpacingTop: {
    top: 48,
    width: 24,
    height: 24,
    position: "absolute",
    borderRadius: borderRadius.l,
    backgroundColor: colors.backgroundGrey,
  },
  boxSpacingBottom: {
    width: 24,
    height: 24,
    bottom: 48,
    position: "absolute",
    borderRadius: borderRadius.l,
    backgroundColor: colors.backgroundGrey,
  },
  titleTxt: {
    lineHeight: 22,
  },
  emptyContainer: {
    marginTop: height / 4,
  },
  imageEmpty: {
    width: 100,
    height: 100,
  },
  contentContainer: {
    padding: spacing.l,
  },
  dividerStyle: {
    marginVertical: spacing.m,
  },
  wrapContent: {
    paddingVertical: spacing.m,
    paddingLeft: spacing.xl,
    paddingRight: spacing.m,
  },
});
