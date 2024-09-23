import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  container: {
    padding: spacing.l,
  },
  description: {
    marginBottom: spacing.l,
  },
  containerItem: {
    backgroundColor: colors.grey3,
    height: 200,
    marginBottom: spacing.m,
  },
});
