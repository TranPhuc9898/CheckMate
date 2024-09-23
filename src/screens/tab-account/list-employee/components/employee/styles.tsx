import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  boxContainer: {
    flex: 1,
  },
  boxName: {
    flex: 1,
  },
  boxItem: {
    borderColor: colors.grey4,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.m,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: spacing.l,
    backgroundColor: colors.background
  },
  boxItemLock: {
    borderColor: colors.grey4,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingVertical: spacing.m,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: spacing.l,
    backgroundColor: colors.grey6,
    alignItems: "center"
  },
  boxBottom: {
    paddingLeft: spacing.m,
    justifyContent: 'center',
  },
  boxIcon: {
    justifyContent: 'center',
  },  
  textPhone: {
    marginTop: spacing.s,
  },
  textRating: {
    marginLeft: spacing.s,
  },
  textServices: {
    marginLeft: spacing.s,
    flex: 1,
  },
  boxPremium: {
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
  boxRating: {
    justifyContent: "center",
    alignItems: "center",
  },
  dividerStyle: {
    marginVertical: spacing.m
  }
});
