import { colors, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  btnHotLine: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 7,
    marginTop: 3,
    marginLeft: spacing.l,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
