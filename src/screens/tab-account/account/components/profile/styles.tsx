import { StyleSheet, Dimensions } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";
const width = Dimensions.get("window").width;

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
    justifyContent: "space-around",
  },
  boxBottom: {
    paddingLeft: spacing.m,
  },
  textPhone: {
    marginVertical: spacing.s,
  },
  textRating: {
    marginLeft: spacing.s,
  },
  textServices: {
    marginLeft: spacing.s,
  },
  boxPremium: {
    backgroundColor: colors.primary3,
    padding: spacing.s,
    borderRadius: borderRadius.s,
    marginLeft: spacing.s,
  },
  imageBGPremium: {
    width: width - spacing.l * 4,
    height: ((width - spacing.l * 4) * 187) / 1000, // 187x1000
    marginTop: spacing.m
  },
  backgroundImageStyle: {
    borderRadius: borderRadius.s,
  },
  boxPremiumContent: {
    width: "60%",
    paddingLeft: spacing.l
  },
  boxServices: {
    marginTop: spacing.l,
  }
});
