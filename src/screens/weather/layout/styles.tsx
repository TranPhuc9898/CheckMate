import { Dimensions, StyleSheet } from "react-native";

import { spacing } from "@src/libs/theme";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  image: {
    width: width * 0.25,
    height: width * 0.25,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    paddingTop: height * 0.08,
  },
  boxTempC: {
    paddingTop: height * 0.08,
    paddingBottom: height * 0.05,
  },
  txtTempC: {
    marginTop: spacing.l,
  },
  txtCityName: {
    marginTop: spacing.l,
  },
  txtContent: {
    marginTop: spacing.l,
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
});
