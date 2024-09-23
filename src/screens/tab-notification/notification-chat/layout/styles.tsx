import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: spacing.l,
  },
  imageAvatar:{
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  badgeStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: borderRadius.s
  },
  askerName: {
    paddingHorizontal: spacing.l,
  },
  serviceText: {
    paddingTop: spacing.m,
  },
  textServiceText:{
    marginRight:spacing.m,
    paddingTop:spacing.m,
    paddingLeft:spacing.l
  }

});
