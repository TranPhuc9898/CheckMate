import { Dimensions, StyleSheet } from "react-native";
import { colors, fontSize, spacing } from "@src/libs/theme";

const {width} = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  txtInstruction: {
    marginVertical: spacing.xxl,
  },
  boxButton: {
    marginBottom: spacing.l,
  },
  boxButtonQuit: {
    paddingVertical: spacing.l,
    justifyContent: "center",
  },
  txtPassedTitle: {
    textAlign: "center",
    marginBottom: spacing.l
  },
  txtPanel: {
    marginBottom: spacing.m
  },
  txtContentPassedTest: {
    lineHeight: fontSize.xxl
  },
  boxPanel: {
    marginTop: spacing.l,
    marginBottom: spacing.xxl
  },
  boxAddressDetail: {
  },
  paddingContainer: {
    paddingBottom: spacing.l,
  },
  backgroundProfile: {
   width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  backgroundTime: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  txtAddress: {
    paddingLeft: spacing.m
  },
  text:{
    paddingTop: spacing.l,
  },
  renderAddress:{
    paddingTop:spacing.l
  },
  paddingBottom:{
    paddingBottom: spacing.l
  },
  imageError: {
    width: width * 0.6,
    height: width * 0.6,
  }

});
