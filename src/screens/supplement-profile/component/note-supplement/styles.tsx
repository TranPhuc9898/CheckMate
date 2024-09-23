import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: borderRadius.s,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    margin: spacing.l,
  },
  txtVertical: {
    paddingVertical: spacing.s,
  },
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
  imageStyle: {
    padding: width * 0.15,
    
  },
  imageFrontStyle:{
    marginVertical:spacing.s,
    padding: width * 0.13,
  },
  imageStyle2:{
    padding: width * 0.15,
    marginVertical: spacing.s
  }
});
