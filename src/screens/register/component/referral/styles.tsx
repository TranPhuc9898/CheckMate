import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

const { width, height, fontScale } = Dimensions.get("window");


export default StyleSheet.create({
  textReferral: {
    paddingVertical: spacing.l,
  },
  btnShare: {
    paddingHorizontal: Math.round((2 * width) / 7),
  },
  txtShare: {
    paddingRight: spacing.m,
  },
  btnShareWith: {
    flex: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    marginHorizontal: spacing.s,
  },

  containerLoading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  imageLoading: {
    width: 50,
    height: 50,
    marginBottom: spacing.m,
  },
  boxShareSuccess: {
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  textStyle: {
    
    paddingTop: spacing.s,
    paddingBottom: spacing.l,
  },
  imageShare: {
    width: spacing.xxxl,
    height: spacing.xxxl,
  },
  footerStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    height: Math.round((2 * width) / 8),
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingBottom: spacing.xxxl,
  },
  textStyle2: {
    paddingTop: spacing.s,
  },
  titleDetail: {
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xxl,
    paddingTop: spacing.xl,
  },
  image: {
    width: spacing.xxxl,
    height: spacing.xxxl,
  },
  directionBox:{
    flexDirection: "row", paddingTop: spacing.l
  },
  boxJoinDay:{
    paddingTop:spacing.s
  },
  image2:{
    borderRadius: spacing.xxxl,
    width: spacing.xxxl * 2,
    height: spacing.xxxl * 2,
  },
  textShare:{
    paddingLeft: spacing.xxxl,paddingTop:spacing.m
  },
  imageBackGround:{
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  textContent:{
    flex:1,
    paddingTop:spacing.s
  }
});
