import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");
export default StyleSheet.create({
  stamp: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  container: {
    paddingTop: spacing.l,
  },
  containerImage: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.65,
    elevation: 3,
  },
  image: {
    width: width - 2 * spacing.l,
    height: (width - 2 * spacing.l) / 2,
    borderTopLeftRadius: borderRadius.s,
    borderTopRightRadius: borderRadius.s,
  },
  txtTitle: {
    textAlign: "right",
    marginTop: spacing.m,
    lineHeight: spacing.xxl,
  },
  txtTitle2: {
    marginTop: spacing.m,
    lineHeight: spacing.xxl,
  },
  txtContent: {
    marginVertical: spacing.l,
    lineHeight: spacing.xxl,
  },
  txtNote: {
    marginVertical: spacing.l,
    lineHeight: spacing.xxl,
  },
  divider: {
    height: spacing.xxxl + spacing.l,
    width: 1,
    backgroundColor: colors.grey3,
  },
  boxTitle: {
    marginTop: spacing.xxl,
    marginHorizontal: spacing.l,
  },
  boxPoint: {
    paddingLeft: spacing.s,
  },
  containerCard: {
    padding: 0,
  },
  wrapButton: {
    padding: spacing.l,
    // paddingBottom: spacing.xxxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.s,
    borderTopRightRadius: borderRadius.s,
  },
  containerContent: {
    paddingBottom: spacing.xxxl,
  },
  txtRight: {
    textAlign: "right",
  },
  lottieTick: {
    width: Math.round(width / 2),
  },
  imageIos: {
    width: Math.round(width / 8),
    height: Math.round(width / 8),
  },
  boxIos: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.l,
  },
  textIos: {
    textAlign: "center",
  },
  boxText: {
    paddingTop: spacing.l,
  },
  linePoint: {
    textDecorationLine: "line-through",
    color: colors.grey1,
    textAlign: "center",
    marginLeft: spacing.s,
  },
  boxDow: {
    paddingTop: spacing.s,
    justifyContent: "space-around",
  },
  imageBrand: {
    width: Math.round(width / 10),
    height: Math.round(width / 10),
    borderRadius: borderRadius.xs,
  },
  boxTextTitle: {
    paddingLeft: spacing.l,
  },
  boxDivider: {
    paddingVertical: spacing.l,
  },
  sizeDivider: {
    marginHorizontal: spacing.xxxl,
  },
  txtMarkDown: {
    fontSize: fontSize.l,
    lineHeight: spacing.xxl,
  },
  txtCondition: {
    paddingVertical: spacing.m,
  },
});
