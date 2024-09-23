import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    flex: 1,
  },
  boxName: {
    flex: 1,
  },
  boxItem: {
    borderBottomWidth: 1,
    borderColor: colors.grey2,
    paddingVertical: spacing.m,
    justifyContent: "space-between",
  },
  boxBottom: {
    paddingLeft: spacing.m,
    justifyContent: "center",
  },
  boxIcon: {
    justifyContent: "center",
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
  textReview: {
    marginTop: spacing.m,
    marginLeft: spacing.m,
  },
  textRatingReview: {
    marginTop: spacing.m,
  },
  boxReview: {
    marginTop: spacing.l,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.s,
  },
});
