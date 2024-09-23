import { borderRadius, colors, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export default StyleSheet.create({
  containerStyle: {
    borderRadius: spacing.l,
    margin: spacing.l,
    marginTop: 0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: "hidden",
  },
  boxContent: {
    width: "40%",
    paddingBottom: spacing.m
  },
  containerBtn: {
    borderRadius: borderRadius.l,
    paddingRight: spacing.l
  },
  txtShare: {
    paddingVertical: spacing.m
  }
});
