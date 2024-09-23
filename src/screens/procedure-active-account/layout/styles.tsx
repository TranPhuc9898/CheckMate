import { Dimensions, StyleSheet } from "react-native";
import { spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");
export const SLIDER_WIDTH = width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export default StyleSheet.create({
  containerCarousel: {
    paddingBottom: 50,
  },
  slideStyle: {
    paddingTop: 50
  },
  containerActiveAccount: {
    paddingVertical: spacing.xxl,
    alignSelf: "center",
  }
});
