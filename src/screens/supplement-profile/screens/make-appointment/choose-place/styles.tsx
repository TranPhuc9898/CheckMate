import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  imageStyle: {
    width: width /2,
    height: width /3,
  },
  boxImage: {
    marginVertical: spacing.l,
  },
  containerPlace: {
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.secondary3,
    marginVertical: spacing.s,
  },
  boxPlace: {
    paddingVertical: spacing.l,
    paddingRight: spacing.m,
  },
  pickedStyle: {
    backgroundColor: colors.secondary3,
  },
  txtStyle: {
    paddingTop: spacing.s,
  },
  containerHeader: {
    marginBottom: spacing.l,
  },
  contentContainerStyle: {
    paddingVertical: spacing.m,
  },
  btnStyle: {
    paddingTop: spacing.l,
  },
  containerCheckBox: {
    paddingHorizontal: 0,
    paddingLeft: 5,
  },
});
