import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxMainAccount: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontFamily: getFontFamilyByLocale().bold,
    fontSize: fontSize.xxxl,
  },
  boxQRCode: {
    padding: spacing.xl,
    borderRadius: borderRadius.s,
    backgroundColor: colors.primary3,
  },
  QRCode: {
    width: 250,
    height: 250,
  },
  txtBtaskeeCompany: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: spacing.l,
  },
  txtSave: {
    marginTop: spacing.m,
  },
  boxText: {
    // backgroundColor: colors.primary3,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.s,
    padding: spacing.m,
    marginLeft: spacing.s,
    marginVertical: spacing.m,
    marginRight: spacing.xl,
  },
  header: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: colors.grey4,
  },
  containerHeader: {
    paddingTop: spacing.l,
  },
  headerText: {
    fontSize: fontSize.l,
    width: "90%",
  },
});
