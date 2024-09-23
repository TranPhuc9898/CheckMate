import { colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonNotification: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    marginBottom: spacing.l,
    color: colors.white,
  },
  rightButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "flex-end",
    marginBottom: spacing.l,
    marginRight: spacing.l,
  },
  iconNotifycation: {
    width: 24,
    height: 24,
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 2,
  },
  clearButton: {
    marginBottom: spacing.s,
  },
});
