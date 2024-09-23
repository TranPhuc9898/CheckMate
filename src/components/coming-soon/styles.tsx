import { StyleSheet, Dimensions } from "react-native";

const {width} = Dimensions.get("window");
const WIDTH_IMAGE = width * 2/3;

export default StyleSheet.create({
  comingSoon: {
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE*2/3,
  },
  txtComingSoon: {
    paddingTop: Math.round(WIDTH_IMAGE/2.6),
  }
});
