import { Dimensions, StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  boxContainer : {
    justifyContent: "space-between"
  },
  divider :{
    paddingBottom: spacing.m
  },
  image:{
    width: Math.round((width) /  10),
    height: Math.round((width) / 10),

  },
  boxImage:{
    paddingLeft: spacing.xxxl,
    paddingRight: spacing.l
  },
  text:{
    paddingTop: spacing.m
  },
});
