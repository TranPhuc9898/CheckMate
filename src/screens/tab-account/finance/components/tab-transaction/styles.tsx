import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize } from "@src/libs/theme";
import { getBottomSpace } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
  },
  priceStyle: {
    fontWeight: 'bold',
    fontSize: fontSize.xl,
  },
  boxItem: {
    flex: 1,
    paddingRight: spacing.s
  },
  textReason: {
    paddingTop: spacing.s,
  },
  titleStyle: {
    color: colors.black,
    fontSize: fontSize.xl,
    fontWeight:'bold'
  },
  containerItem: {
    padding: spacing.l,
  },
  containerIcon: {
    borderRadius: borderRadius.l,
    padding: spacing.s,
    marginRight: spacing.l,
  },
  cardStyle: {
    flex: 1,
    paddingHorizontal:0,
    marginTop: spacing.l,
  },
  headerStyle: {
    marginBottom: 0,
    alignItems: "center",
    paddingHorizontal:spacing.l
  },
  container: {
    marginBottom: getBottomSpace() ? getBottomSpace() : spacing.l,
  },
  boxDivider:{
    paddingTop:spacing.m
  }
});
