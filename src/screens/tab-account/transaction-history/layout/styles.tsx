import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
    justifyContent: "space-around",
  },
  boxName: {
    flex: 1,
  },
  boxBottom: {
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: spacing.m,
  },
  textPhone: {
    marginTop: spacing.s,
  },
  textRating: {
    marginLeft: spacing.s,
  },
  textServices: {
    paddingLeft: spacing.s,
    textAlign: "right",
  },
  lastText: {
    paddingBottom: spacing.s,
  },
  boxItem: {
    justifyContent: "space-between",
    paddingBottom: spacing.s,
  },
  boxArrayText: {
    marginBottom: spacing.s,
    flex: 1,
  },
  boxIconPremium: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary3,
    padding: spacing.s,
    borderRadius: borderRadius.s,
    marginLeft: spacing.s,
  },
  boxLeftBottom: {
    paddingTop: spacing.s,
    justifyContent: "center",
    alignItems: "center",
  },
  boxEmptyData: {
    marginVertical: spacing.xl,
  },
  cardStyle: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  boxMonth: {
    paddingHorizontal: spacing.l,
  },
  dividerStyle: {
    paddingTop: spacing.m,
  },
  containerItem: {
    paddingHorizontal: spacing.s,
    paddingRight: spacing.m,
  },
  dateStyle:{
    color: colors.grey1,
    fontSize: fontSize.m
  }
});
