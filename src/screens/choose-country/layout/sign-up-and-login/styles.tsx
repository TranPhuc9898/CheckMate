import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingBottom: spacing.xl
  },
  txtStyles: {
    marginVertical: spacing.l
  },
  titleBtnLogin: {
    color: colors.primary
  },
  btnLogin: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: borderRadius.s
  },
  txtLearnMore: {
    textDecorationLine: "underline"
  },
  containerFooter: {
    paddingBottom: spacing.l,
  },
  imageStyle: {
    width: width/1.5,
    height: width/1.5
  },
  containerImage: {
    paddingTop: spacing.xxxl
  },
  containerTitle: {
    marginHorizontal: spacing.l
  },
  containerDivider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.grey1,
  },
  boxTxt: {
    zIndex: 1,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.l,
  },
  containerMid: {
    height: 55,
    justifyContent: "center",
  }
});
