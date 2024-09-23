import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },
  textAmount: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.l,
  },
  boxButton: {
    justifyContent: "space-between",
    paddingTop: spacing.l,
    flex: 1,
  },
  boxMaxMoney: {
    marginTop: spacing.s,
  },
  textNote: {
    marginRight: spacing.s,
  },
  priceStyle: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.s,
    borderColor: colors.primary2,
    padding: spacing.l,
    fontSize: fontSize.xxl,
    marginBottom: spacing.l,
    width: "55%",
  },
});
