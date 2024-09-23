import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  containerCard: {
    maxWidth: 320,
  },
  containerHeader: {
    position: "absolute",
    top: -40,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.l,
    width: 48,
    height: 48,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageStyle: {
    width: 170,
    height: 170,
  },
  txtContent: {
    marginVertical: spacing.m,
  },
  lineBackground: {
    backgroundColor: colors.primary2,
    width: "100%",
    height: 4,
    borderRadius: borderRadius.s,
    marginVertical: spacing.m,
  },
  lineProcess: {
    backgroundColor: colors.primary,
    height: 4,
    borderRadius: borderRadius.s,
    overflow: "hidden",
  },
  btnSuccess: {
    backgroundColor: colors.success,
  },
  txtBtnSuccess: {
    marginLeft: spacing.m,
  },
  txtTestFalse: {
    fontStyle: "italic",
    paddingVertical: spacing.s,
  },
  boxContent: {
    paddingVertical: spacing.s,
  },
  boxFooter: {
    marginTop: spacing.m,
  },
  lottieTick: {
    width: 74,
    height: 74,
  },
  boxProcess: {
    marginBottom: spacing.xxxl,
  },
});
