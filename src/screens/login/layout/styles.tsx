import { Dimensions, StyleSheet } from "react-native";
import { spacing, colors } from "@src/libs/theme";
import { ifIphoneX } from "react-native-iphone-x-helper";

const width = Dimensions.get("window").width;
export default StyleSheet.create({
  wrapActions: {
    justifyContent: "space-between",
    marginTop: spacing.xl,
  },
  inputContainerStyle: {
    borderColor: colors.white,
  },
  labelStyle: {
    color: colors.white,
  },
  boxLogo: {
    marginVertical: spacing.xxxl,
  },
  txtLogo: {
    marginBottom: spacing.s,
  },
  boxFooter: {
    justifyContent: "space-between",
    paddingTop: spacing.xxxl * 2,
    paddingHorizontal: spacing.xxl,
    ...ifIphoneX({
      paddingTop: "15%",
    }),
  },
  logoStyle: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  inputStyle: {
    paddingVertical: 5,
  },
  imageBee: {
    width: Math.round(width / 6),
    height: Math.round(width / 6),
  },
  imageFlag: {
    width: spacing.xxxl,
    height: spacing.xl,
    marginRight: spacing.m
  },
  boxLogoView: {
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxxl
  },
  boxImageBee: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xxxl,
  },
  boxText: {
    paddingLeft: spacing.xl
  },
  fontSize: {
    fontSize: 42
  },
  boxInput: {
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.xxxl
  },
  boxBtnLogin: {
    paddingTop: spacing.xxxl
  },
  footer: {
    paddingBottom: spacing.xxxl
  },
  btnRegister: {
    paddingLeft: spacing.s
  },
  iconLanguage: {
    marginRight: spacing.m
  },
  btnForgotPassword: {
    flexDirection: "row", justifyContent: "flex-end"
  },
  boxContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.white
  },
  boxTxtLanguage: {
    maxWidth: width / 4,
  }
});
