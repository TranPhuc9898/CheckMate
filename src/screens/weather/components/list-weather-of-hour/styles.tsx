/* eslint-disable react-native/no-color-literals */
import { Dimensions, StyleSheet } from "react-native";

import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: spacing.l,
  },
  boxItem: {
    width: (width - spacing.l * 5) / 4,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.l,
    borderRadius: 5,
    backgroundColor: "rgba(145, 132, 110, 0.2)",
  },
  txtByHour: {
    margin: spacing.l,
  },
});
