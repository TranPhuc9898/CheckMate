import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginTop: spacing.l,
  },
  contentLine: {
    paddingLeft: spacing.m,
  },
  spacingText: {
    marginVertical: spacing.s,
  },
  containerDish: {
    marginTop: spacing.m,
    backgroundColor: colors.primary3,
    borderRadius: borderRadius.s,
    padding: spacing.l,
  },
  dividerStyle: {
    marginVertical: spacing.m,
    color: colors.grey0,
  },

});
