import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize, fontWeightTheme } from "@src/libs/theme";

export default StyleSheet.create({
  txtText2: {
    marginTop: spacing.m,
    marginBottom: spacing.s,
    fontSize: fontSize.l,
    textAlign: 'center',
  },
  txtText: {
    color: colors.secondary,
    fontSize: fontSize.xl,
    textAlign: 'center',
    marginBottom: spacing.s,
  },
  box:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.m,
  },
  currencyStyle: {
    color: colors.primary,
    fontSize: fontSize.m,
  },
  priceStyle:{
    color: colors.primary,
    fontWeight: fontWeightTheme.xl as any,
  }
});
