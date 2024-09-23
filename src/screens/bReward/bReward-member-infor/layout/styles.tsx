import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  imageBackground: {
    width: width - spacing.l * 2,
    padding: spacing.l,
  },
  imageStyle: {
    borderRadius: borderRadius.s,
  },
  wrapContainer: {
    padding: spacing.l,
    marginBottom: spacing.m,
  },
  iconPoint: {
    marginRight: spacing.l,
  },
  txtLabel: {
    paddingBottom: spacing.s,
  },
  wrapPointBottom: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: 5,
  },
  boxBottom: {
    alignItems: "center",
  },
});
