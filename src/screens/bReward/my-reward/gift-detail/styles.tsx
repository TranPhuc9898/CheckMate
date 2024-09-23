import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");
export const HEIGHT_BAR_CODE = width / 3;

export default StyleSheet.create({
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
    marginHorizontal: spacing.l,
    marginTop: spacing.m,
  },
  boxTitle: {
    marginTop: spacing.l,
    marginHorizontal: spacing.l,
  },
  boxPoint: {
    paddingLeft: spacing.s,
  },
  containerCard: {
    padding: 0,
  },
  containerContent: {
    paddingBottom: spacing.xxxl,
  },
  txtLabel: {
    paddingBottom: spacing.s,
  },
  imageBrand: {
    width: Math.round(width / 10),
    height: Math.round(width / 10),
    borderRadius: borderRadius.xs,
  },
  boxTextTitle: {
    paddingLeft: spacing.l,
  },
  txtTitle2: {
    marginTop: spacing.m,
    lineHeight: spacing.xxl,
  },
  boxIos: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.l,
  },
  boxDow: {
    paddingTop: spacing.s,
    justifyContent: "space-around",
  },
  imageIos: {
    width: Math.round(width / 8),
    height: Math.round(width / 8),
  },
  boxText: {
    paddingTop: spacing.l,
  },
  textIos: {
    textAlign: "center",
  },
  boxPromotionCode: {
    paddingVertical: spacing.xxl,
  },
  boxIconCopy: {
    paddingLeft: spacing.s,
    justifyContent: "center",
  },
  boxDate: {
    paddingVertical: spacing.l,
  },
  boxQR: {
    paddingTop: spacing.l,
  },
  txtMarkDown: {
    fontSize: fontSize.l,
    lineHeight: spacing.xxl,
  },
  txtCondition: {
    paddingVertical: spacing.m,
  },
  barCode: {
    width: width / 3,
    height: width / 3,
  },
});
