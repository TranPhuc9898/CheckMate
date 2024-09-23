import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: spacing.m
  },
  lineContainer: {
    marginVertical: spacing.s,
  },
  iconRight: {
    alignItems: "flex-end",
  },
  lineHeight: {
    lineHeight: spacing.xxl
  },
  titleModal: {
    marginBottom: spacing.l
  },
  btnDetail: {
    paddingHorizontal: spacing.l,
  },
  iconLeader: {
    marginLeft: spacing.m
  },
  btnCall: {
    paddingHorizontal: spacing.xxl,
  },
  containerAcceptTasker: {
    backgroundColor: colors.primary3,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    marginTop: spacing.m,
    borderRadius: borderRadius.s
  },
  boxTasker: {
    marginVertical: spacing.m,
  },
  boxInfoTasker: {
    marginHorizontal: spacing.l,
  },
  currencyStyle: {
    color: colors.black,
    fontSize: fontSize.s,
  },
  priceStyle: {
    color: colors.black,
  },
});
