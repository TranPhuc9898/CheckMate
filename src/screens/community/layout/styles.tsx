import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
    justifyContent: "space-around",
  },
  boxIcon: {
    justifyContent: 'center',
    padding: spacing.m,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.s,
    marginBottom: spacing.s,
  },
});