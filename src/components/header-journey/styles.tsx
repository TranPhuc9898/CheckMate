import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",

  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: spacing.xxl,
  },
  grButton: {
    position: "absolute",
    right: spacing.l,
    bottom: spacing.m,
  },
  grGiftButton: {
    position: "absolute",
    backgroundColor: colors.primary2,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    borderRadius: borderRadius.s,
    right: spacing.xl,
    bottom: 15,
  },
  btnBack: {
    position: "absolute",
    left: 5,
    bottom: 0,
    top: 20,
    justifyContent: "flex-end",
    marginBottom: spacing.l,
    marginLeft: spacing.l,
    zIndex: 1
  },
  boxIcon:{
    borderRadius: spacing.l,
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperBack: {
    borderRadius: 15,
    backgroundColor: colors.primary1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  txtPoint: {
    marginLeft: spacing.s,
  }
});
