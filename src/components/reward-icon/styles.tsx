import { StyleSheet } from "react-native";
import { colors, fontSize, spacing, borderRadius } from "@src/libs/theme";
// import helpers from "../../lib/helpers";

export default StyleSheet.create({
  badge: {
    backgroundColor: colors.error,
    position: "absolute",
    top: 5,
    right: 2,
    borderRadius: 10,
    minWidth: 10,
    minHeight: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  icon: {
    width: 40,
    height: 40,
  },
  container: {
    borderRadius: spacing.l,
    alignItems: "center",
    justifyContent: "center",
  },
});
