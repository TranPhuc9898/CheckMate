import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  boxText: {
    paddingVertical: spacing.l,
  },
  image: {
    width: Math.round(width / 4),
    height: Math.round(width / 4),
  },
  footerBtn: {
    paddingTop: spacing.xxl,
  },
  camera: {
    flex: 1,
  },
  boxText2: {
    paddingTop: spacing.m,
  },
  imageFrontOrBack: {
    width: Math.round(width / 2),
    height: Math.round(width / 2),
  },
});
