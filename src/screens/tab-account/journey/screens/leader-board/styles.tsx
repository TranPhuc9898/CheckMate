import { Dimensions, StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  cardHeader: {
    marginTop: spacing.xl
  },
  logoBee: {
    width: width / 5,
    height: width / 5,
  },
  dividerStyle: {
    marginVertical: spacing.m
  },
  wrapTop: {
    justifyContent: "flex-end"
  },
  wrapInfoTop: {
    maxWidth: width / 5
  },
  wrapMyAvatar: {
    borderWidth: 4,
    borderColor: colors.secondary,
    borderRadius: 150,
    marginVertical: spacing.m
  },
  wrapAvatar: {
    borderWidth: 4,
    borderRadius: 150,
    marginVertical: spacing.m,
    borderColor: colors.white,
  },
  contentContainerStyle: {
    paddingBottom: spacing.xxxl,
  },
  wrapAvtMember: {
    marginHorizontal: spacing.l,
  },
  wrapMyRankItem: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary,
    borderWidth: 1
  },
  txtActive: {
    fontWeight: "bold"
  },
  wrapCalculate: {
    justifyContent: "flex-end",
    paddingBottom: spacing.l
  },
  txtCalculate: {
    paddingRight: spacing.l,
    paddingLeft: spacing.s
  },
  imageEmpty: {
    width: width - 2*spacing.xxxl,
    height: (width - 2*spacing.xxxl)*2/3
  },
  containerEmpty: {
    paddingTop: width/4
  },
  txtEmpty: {
    paddingTop: spacing.l
  }
});
