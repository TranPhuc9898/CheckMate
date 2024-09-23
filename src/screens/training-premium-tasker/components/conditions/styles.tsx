import { Dimensions, StyleSheet } from "react-native";

import { spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginBottom: spacing.s,
  },
  imgStyle: {
    marginVertical: spacing.l,
    width: width / 2,
    height: width / 2,
  },
  txtTitle: {
    marginVertical: spacing.l,
  },
  wrapLine: {
    marginVertical: spacing.l,
  },
  wrapContent: {
    paddingLeft: spacing.m,
  },
});
