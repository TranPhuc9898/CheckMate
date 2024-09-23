import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  txtOfficeName: {
    marginBottom: 5,
  },
  containerStyle: {
    paddingTop: spacing.l,
    backgroundColor: colors.white,
  },

  boxContainer: {
    paddingVertical: spacing.l,
  },
  boxIcon: {
    paddingRight: spacing.m,
  },
  boxText: {
    paddingTop: spacing.m,
    paddingBottom: spacing.l,
  },
  headerStyle: {
    paddingBottom: spacing.m,
  },
  giftStyle: {
    paddingBottom: spacing.l,
  },
  boxCard: {
    paddingTop: spacing.m,
  },
});
