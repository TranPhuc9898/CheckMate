import { borderRadius, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  cardContainer: {
    padding: spacing.l,
    flex: 1,
  },
  boxItem: {
    paddingVertical: spacing.l,
  },
  image: {
    width: Math.round(width - 2*spacing.xxxl),
    height: Math.round(width / 2 - spacing.xxxl)
  },
  txtCreatedAt: {
    marginBottom: spacing.s,
  },
  txtMarkDown: {
    fontSize: fontSize.xl,
    lineHeight: 30,
  },
  wrapContent: {
    paddingVertical: spacing.l
  },
  bulletListIcon: {
    paddingTop: 4
  }
});
