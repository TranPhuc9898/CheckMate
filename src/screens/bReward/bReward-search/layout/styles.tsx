import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.l,
    backgroundColor: colors.white,
  },
  inputStyle: {
    backgroundColor: colors.grey5,
    marginBottom: 0,
    color: colors.black,
  },
  errorStyle: {
    margin: 0,
    height: 0,
  },
  containerStyle: {
    paddingHorizontal: spacing.l,
  },
  itemSearch: {
    borderWidth: 1,
    margin: spacing.s,
    marginRight: spacing.m,
    borderColor: colors.grey3,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: borderRadius.s,
  },
  containerEmptyData: {
    padding: spacing.xxxl,
  },
  txtNoteEmptyData: {
    padding: spacing.l,
    textAlign: "center",
  },
  textInput: {
    color: colors.black,
  },
  headerStyle: {
    paddingBottom: spacing.m,
  },
  giftStyle: {
    paddingBottom: spacing.l,
  },
  hitSlop: {
    top: spacing.m,
    bottom: spacing.m,
    left: spacing.m,
    right: spacing.m,
  },
  wrapIcon: {
    position: "absolute",
    right: -spacing.m,
    top: -spacing.s,
  },
  boxIcon: {
    backgroundColor: colors.background
  }
});
