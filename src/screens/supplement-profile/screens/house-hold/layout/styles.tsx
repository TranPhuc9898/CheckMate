import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerUpload: {
    borderWidth: 1,
    margin: spacing.s,
    padding: spacing.l,
    borderStyle: "dashed",
    borderRadius: borderRadius.s,
    borderColor: colors.secondary,
  },
  containerBtn: {
    paddingHorizontal: spacing.m,
  },
  txtBtn: {
    paddingLeft: spacing.s,
  },
  imageStyle:{
    marginVertical: spacing.m,
    width: Math.round( width / 3),
    height: Math.round( width / 3),
  },
  imageActive:{
    flex: 1,
    resizeMode: 'contain',
  }
});
