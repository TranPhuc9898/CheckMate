import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

const { width, height, fontScale } = Dimensions.get("window");

const WIDTH_BACKGROUND = width - 32;
const HEIGHT_BACKGROUND = WIDTH_BACKGROUND * 1.46;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  scrollStyle: {
    paddingTop: spacing.xxl,
  },
  backgroundStyle: {
    width: WIDTH_BACKGROUND,
    height: HEIGHT_BACKGROUND,
    alignItems: "center",
  },
  imgBadge: {
    width: width / 3,
    height: width / 3,
    marginTop: spacing.xxxl,
  },
  txtTitle: {
    color: colors.black,
    fontSize: fontSize.xl,
    fontWeight: "700",
    textAlign: "center",
    marginTop: spacing.m,
  },
  txtSubTitle: {
    color: colors.black,
    fontSize: fontSize.l,
    fontWeight: "400",
    textAlign: "center",
    marginTop: spacing.s,
  },
  imgStar: {
    width: spacing.l,
    height: spacing.l,
    marginHorizontal: spacing.l,
  },
  boxTaskerName: {
    marginTop: spacing.l,
    alignItems: "center",
    borderBottomColor: colors.grey3,
    borderBottomWidth: 1,
  },
  txtTaskerName: {
    textAlign: "center",
    fontSize: fontSize.m / fontScale,
    textTransform: "uppercase",
    marginTop: HEIGHT_BACKGROUND / 1.96,
    color: "black",
    fontWeight: "700",
  },
  boxFooter: {
    marginTop: spacing.xxxl,
    alignItems: "center",
  },
  btnTouchable: {
    borderRadius: borderRadius.s,
    backgroundColor: "white",
    paddingHorizontal: spacing.xxxl * 2,
    paddingVertical: spacing.l,
  },
  txtShare: {
    color: colors.primary,
    fontSize: fontSize.l,
    fontWeight: "700",
  },
});
