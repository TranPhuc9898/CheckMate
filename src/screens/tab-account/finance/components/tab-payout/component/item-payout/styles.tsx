import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";
import { getBottomSpace } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    paddingHorizontal: spacing.l,
    paddingBottom:spacing.l
  },
  boxLabel:{
    paddingTop:spacing.l
  },
  priceStyle: {
    fontWeight: "bold",
    fontSize: fontSize.xxl,
  },
  textReason: {
    textAlign: "center",
    color: colors.white,
  },
  box: {
    justifyContent: "space-between",
  },
  currencyStyle: {
    color: colors.grey1,
    fontSize: fontSize.m,
  },
  boxTitle: {
    borderRadius: spacing.xl,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    marginTop: spacing.l,
  },
  boxDivider: {
    paddingTop: spacing.l,
  },
  boxCreatedAt: {
    paddingTop: spacing.m,
  },
});
