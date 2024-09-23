import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  containerStyle: {
    paddingTop: spacing.l,
    backgroundColor: colors.backgroundGrey,
  },
  headerStyle: {
    paddingBottom: spacing.m,
  },
  giftStyle: {
    paddingBottom: spacing.l,
  },
  slide: {
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: spacing.l,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 2,
    borderTopLeftRadius: borderRadius.s,
    borderTopRightRadius: borderRadius.s,
  },
  containerCard: {
    paddingHorizontal: 0
  }
});
