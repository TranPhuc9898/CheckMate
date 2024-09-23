import { spacing } from "libs/theme";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: spacing.m,
      },
    }),
  },
});
