import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  textTitle: {
    color: colors.primary,
  },
  boxIcon: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.m,
    borderRadius: borderRadius.s,
    paddingVertical: 3
  },
});
