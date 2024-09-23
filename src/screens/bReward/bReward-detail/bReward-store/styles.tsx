import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  numberOfOffice: {
    marginTop: 10,
  },
  txtOfficeName: {
    marginBottom: 5,
  },
  containerStyle: {
    paddingTop: spacing.l,
    backgroundColor: colors.white,
  },

  boxContainer: {
    paddingTop: spacing.l,
  },
  boxIcon: {
    // paddingTop: 2,
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
  boxStore: {
    justifyContent: "flex-end",
  },
  boxBranch: {
    paddingRight: spacing.m,
  },
});
