import { StyleSheet } from "react-native";
import { spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxMainAccount: {
    paddingTop: spacing.xl,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxxl,
  },
  boxAccount: {
    padding: spacing.l,
  },
  textUserName: {
    paddingTop: spacing.m,
  },
  txtNoteConfirm: {
    paddingHorizontal: spacing.s,
    marginTop: spacing.xxl,
  },
  imageBank: {
    width: 50,
    height: 50,
    marginRight: spacing.l,
  },
});
