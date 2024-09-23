import { colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const SIZE_IMAGE = Math.round(width / 10);

export default StyleSheet.create({
  image: {
    width: SIZE_IMAGE,
    height: SIZE_IMAGE,
  },
  container: {
    marginHorizontal: 10,
    marginBottom: spacing.m
  },
  wrapIconCondition: {
    position: "absolute",
    top: 10,
    left: 30,
    right: 30,
    bottom: 0,
  },
  labelCondition: {
    position: "absolute",
    top: width/3 - spacing.xxxl,
  },
  txtMarkDownStyle: {
    fontSize: fontSize.l,
    color: colors.grey1,
  },
  paragraphStyle: {
    marginTop: 0,
    marginBottom: 0
  },
  txtMarkDown: {
    fontSize: fontSize.l,
  },
});
