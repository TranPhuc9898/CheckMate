import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  divider: {
    paddingTop: spacing.xl,
  },
  boxSocial: {
    paddingTop: spacing.xl,
    paddingLeft: spacing.s,
  },
  boxText:{
    paddingLeft: spacing.m,
  },
  boxDivider:{
    paddingTop: spacing.xl
  }
});
