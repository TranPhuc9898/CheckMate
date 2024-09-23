import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  imageStyle: {
    width: width - 2 * spacing.xxxl,
    height: (width - 2 * spacing.xxxl) * 0.75,
  },
  txtContent: {
    paddingVertical: spacing.m,
  },
  txtInfo: {
    paddingHorizontal: spacing.m,
  },
  boxInfo: {
    paddingTop: spacing.m,
  },
  btnCallStyle: {
    marginLeft: spacing.s,
  },
  btnChatStyle: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: borderRadius.s,
    marginRight: spacing.s,
  },
  containerBtn: {
    paddingTop: spacing.l,
  },
  dividerStyle: {
    marginVertical: spacing.m,
  },
  containerHeaderCard: {
    marginTop: spacing.l,
  },
  imageNotSuccess: {
    width: width / 2,
    height: width / 2,
  },
});
