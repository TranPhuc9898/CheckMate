import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
  fontWeightTheme,
} from "@src/libs/theme";

export default StyleSheet.create({
  txtText: {
    color: colors.black,
    fontSize: fontSize.l,
    textAlign: "center",
    marginBottom: spacing.s,
  },
  txtText2: {
    marginTop: spacing.m,
    marginBottom: spacing.s,
    fontSize: fontSize.l,
  },
  box: {
    paddingTop: spacing.m,
    justifyContent: "space-between",
  },
  currencyStyle: {
    color: colors.primary,
    fontSize: fontSize.m,
  },
  priceStyle: {
    color: colors.primary,
    fontWeight: fontWeightTheme.xl as any,
    textAlign: "right",
  },
  txtSave: {
    marginTop: spacing.m,
  },
  boxText: {
    backgroundColor: colors.primary3,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.s,
    padding: spacing.m,
    marginLeft: spacing.s,
    marginVertical: spacing.m,
    marginRight: spacing.xxxl,
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
  btnSave: {
    marginTop: spacing.xl,
  },
  containerContact: {
    justifyContent: "space-between",
    backgroundColor: colors.primary3,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: spacing.l,
    borderRadius: 10,
    flexWrap: "nowrap",
    marginTop: spacing.l,
  },
  txtTextContact: {
    textAlign: "right",
  },
  txtTextContactInformation: {
    marginTop: spacing.s,
    textAlign: "right"
  },
  txtQRCode: {
    marginBottom: spacing.l,
  },
  wrapContent: {
    marginTop: spacing.l,
  },
  txtContent: {
    textAlign: "right",
  },
  iconCopy: {
    marginLeft: spacing.s,
  },
  boxProcedureText: {
    marginLeft: spacing.s,
    marginTop: spacing.xxxl,
    marginRight: spacing.xl,
    flex: 1,
    paddingRight: 20,
  },
});
