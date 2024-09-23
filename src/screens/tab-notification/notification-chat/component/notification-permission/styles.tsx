import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.secondary3,
    borderColor: colors.secondary1,
    borderWidth: 2,
  },
  containerBox: {
    paddingVertical: spacing.s,
  },
  btnStyle: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: borderRadius.s,
  },
  text: {
    paddingTop: spacing.s,
  },
  text2: {
    fontSize: spacing.l,
  },
  boxContainer: {
    paddingRight: spacing.m,
  },
  lottieBell: {
    width: 50,
    height: 50,
    tintColor: "black",
  },
  button: {
    borderWidth: 1,
  },
  styleNoti: {
    justifyContent: "flex-end",
    paddingRight: spacing.l,
    paddingTop:spacing.m
   
  },
});
