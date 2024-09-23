import { borderRadius, colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerWarning: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    padding: spacing.l,
    marginHorizontal: spacing.l,
    marginBottom: spacing.l
  },
  wrapContext: {
    paddingLeft: spacing.l
  },
  txtPadding: {
    paddingVertical: spacing.m
  },
  txtMarkDown: {
    fontSize: fontSize.m
  },
  dividerStyle: {
    marginVertical: spacing.m
  },
  txtLineHeight: {
    lineHeight: spacing.xl
  },
  containerRating: {
    marginTop: spacing.l
  },
  txtPaddingTop: {
    paddingTop: spacing.m
  },
  dividerPadding: {
    marginHorizontal: width/7
  }
});
