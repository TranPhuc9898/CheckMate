import { StyleSheet, Dimensions } from "react-native";
import { spacing } from "@src/libs/theme";
const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 2;

export default StyleSheet.create({
  boxDivider: {
    paddingVertical: spacing.l,
  },
  sizeDivider: {
    marginHorizontal: spacing.xxxl,
  },
  boxPoint: {
    marginTop: spacing.m,
    justifyContent: "space-between",
  },
  lottieTick: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  txtTitle: {
    textAlign: "right",
    marginTop: spacing.m,
    lineHeight: spacing.xxl,
  },
});
