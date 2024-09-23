import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
    justifyContent: "space-around",
  },
  boxName: {
    flex: 1,
  },
  boxBottom: {
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: spacing.m
  },
  textPhone: {
    marginTop: spacing.s,
  },
  textRating: {
    marginLeft: spacing.s,
  },
  textServices: {
  },
  lastText: {
    paddingBottom: spacing.s,
  },
  boxItem: {
    justifyContent: 'space-between',
    paddingBottom: spacing.s,
  },
  boxArrayText: {
  },
  boxIconPremium:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary3,
    padding: spacing.s,
    borderRadius: borderRadius.s,
    marginLeft: spacing.s
  },
  boxLeftBottom: {
    paddingTop: spacing.s,
    justifyContent: "center",
    alignItems: "center",
  },
  textDistrict:{
    paddingRight: spacing.m, 
    paddingTop: spacing.m
  },
  textListService:{
    paddingTop: spacing.m
  },
  listService:{
    paddingBottom: spacing.l
  },
  textLevel:{
    paddingBottom: spacing.l, 
    paddingTop: spacing.m
  },
  level:{
    flexDirection:"row",justifyContent:"space-between"
  }

});
