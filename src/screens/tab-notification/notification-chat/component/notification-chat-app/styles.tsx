import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.primary
  },
  containerBox: {
    paddingVertical: spacing.s
  },
  btnStyle: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: borderRadius.s,
  }
});
