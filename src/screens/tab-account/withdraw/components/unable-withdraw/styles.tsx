import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  containerMainAccount: {
    marginBottom: spacing.l,
  },
  priceStyle: {
    fontWeight: "bold",
    color: colors.primary,
  },
  currencyStyle: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: fontSize.l,
  },
  boxPrice: {
    marginLeft: spacing.s,
  },
  dividerStyle: {
    marginVertical: spacing.l,
  },
  txtNote: {
    paddingVertical: spacing.s,
  },
  boxNote: {
    paddingLeft: spacing.m,
  },
});
