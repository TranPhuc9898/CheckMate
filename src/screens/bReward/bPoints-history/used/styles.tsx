import { StyleSheet } from "react-native";
import { spacing } from "@src/libs/theme";

export default StyleSheet.create({
  containerStyle: {
    paddingBottom: spacing.xxxl,
  },
  boxEmptyData: {
    paddingTop: spacing.l
  },
  txtStyle: {
    paddingBottom: spacing.s
  },
  txtPaddingLeft: {
    paddingLeft: spacing.s
  },
  titleDate: {
    paddingLeft: spacing.l,
    paddingBottom: spacing.l
  },
  boxTransaction: {
    marginTop: spacing.xxl,
  },
  txtLink: {
    textDecorationLine: "underline"
  },
  boxFooter: {
    marginBottom: spacing.l
  }
});
