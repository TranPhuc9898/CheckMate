import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";
const FLAG_SIZE = 40;

export default StyleSheet.create({
  titleStyles: {
    marginBottom: spacing.l,
    marginTop: spacing.s
  },
  countryContainer: {
    borderColor: colors.primary2,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.xl,
    marginVertical: spacing.s,
  },
  recordCountry: {
    marginVertical: spacing.s
  },
  flagStyles: {
    width: FLAG_SIZE,
    height: FLAG_SIZE,
    marginRight: spacing.xxl
  },
  titleChooseLanguage: {
    marginTop: spacing.xxl,
    marginLeft: spacing.m
  },
  containerChooseLanguage: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    overflow: "hidden",
    marginTop: spacing.m
  },
  containerStyle: {
    paddingBottom: spacing.l,
  },
  cardStyle: {
    marginBottom: spacing.l,
  },
});
