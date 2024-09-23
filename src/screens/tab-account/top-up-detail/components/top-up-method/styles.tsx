import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    padding: 0,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.s,
  },
  textMethod: {
    marginTop: spacing.m,
    fontSize: 12,
  },
  boxMethod: {
    width: "20%",
    alignItems: "center",
  },
  boxIconNext: {
    width: "6.66%",
    paddingTop: spacing.m,
  },
  buttonStyle: {
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xl,
    marginBottom: spacing.m
  }
});
