import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxMainAccount: {
    paddingVertical: spacing.xl,
  },
  mainAccountStyle: {
    fontWeight: "bold",
    fontSize: fontSize.xxl,
    color: colors.primary1,
  },
  currencyStyle: {
    color: colors.primary1,
  },
  boxAccount: {
    padding: spacing.l,
  },
  textUserName: {
    paddingTop: spacing.m,
  },
  imageLoading: {
    width: 100,
    height: 100,
  },
  giftStyle: {
    marginBottom: spacing.l,
  },
  imageBank: {
    width: 50,
    height: 50,
    marginRight: spacing.l,
  } 
});
