import { Dimensions, StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

const SIZE_DOT = 8;
const SIZE_ACTIVE = SIZE_DOT * 3;
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerStyle: {
    paddingBottom: spacing.l,
  },
  cardStyle: {
    marginBottom: spacing.l,
  },
  dotActive: {
    width: SIZE_ACTIVE,
    height: SIZE_DOT,
    borderRadius: SIZE_DOT / 2,
    backgroundColor: colors.primary,
    marginHorizontal: spacing.s / 2,
  },
  btnStyle: {
    marginTop: spacing.l,
    backgroundColor: colors.primary
  },
  backgroundImageStyle: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  txtTitle: {
    marginLeft: spacing.m,
  },
  txtLabel: {
    marginTop: spacing.xxxl,
  },
  txtContent: {
    paddingTop: spacing.s,
    lineHeight: 22
  }
});
