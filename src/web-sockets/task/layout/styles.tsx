import { colors } from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerBtnNotify: {
    flex: 1,
    marginTop: spacing.l
  },
  boxBtnNotify: {
    flex: 1
  },
  titleStyleBtnNotify: {
    color: colors.secondary,
  },
  buttonStyleBtnNotify: {
    borderWidth: 1,
    borderColor: colors.secondary,
    marginRight: spacing.m
  },
});
