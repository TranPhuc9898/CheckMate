import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.m
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: spacing.m,
    color: colors.white,
    allowFontScaling: false,
  },
  grButton: {
    position: "absolute",
    right: spacing.l,
    bottom: 0
  },
  btnBack: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 20,
    justifyContent: "flex-end",
    marginLeft: spacing.l,
    zIndex: 1
  },
  wrapper: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogout: {
    marginLeft: spacing.m,
  },
  textLogoutNote: {
    marginTop: spacing.m,
  },
});
