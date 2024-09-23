import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.s,
  },
  contentLine: {
    paddingBottom: spacing.s,
  },
  container: {
    marginTop: spacing.l,
  },
  containerLaundryDetail: {
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.m,
    marginTop: spacing.s,
    backgroundColor: colors.primary3
  },
  containerHeader: {
    minHeight: 40,
    padding: spacing.s,
    paddingTop: spacing.m,
  },
  btnConfirmPickUp: {
    marginBottom: spacing.xxxl,
    marginHorizontal: spacing.l,
  },
  boxDate: {
    flex: 9,
  },
  priceStyle: {
    color: colors.grey0,
    fontSize: fontSize.m,
  },
  lineClothes: {
    paddingRight: spacing.s,
  },
  boxClothes: {
    marginVertical: spacing.s,
  },
});
