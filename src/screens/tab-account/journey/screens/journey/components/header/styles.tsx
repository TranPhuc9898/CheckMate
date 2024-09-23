import { spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const SIZE_IMAGE = Math.round(width / 6);

export default StyleSheet.create({
  containerHeader: {
    marginTop: spacing.l,
  },
  iconBee: {
    width: SIZE_IMAGE,
    height: SIZE_IMAGE,
  },
  boxIcon: {
    paddingRight: spacing.l
  },
  boxTxt: {
    paddingRight: spacing.xxxl,
  },
  txtTitle: {
    paddingVertical: spacing.s
  }
});
