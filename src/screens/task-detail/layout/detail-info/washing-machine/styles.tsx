import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.l,
  },
  txtLine: {
    paddingTop: spacing.m,
  },
  containerDetail: {
    backgroundColor: colors.primary3,
    borderRadius: borderRadius.s,
    padding: spacing.l,
    marginTop: spacing.l,
  },
  txtOption: {
    textAlign: "right",
    marginBottom: spacing.s,
  },
  txtType: {
    marginTop: 3,
  },
  containerRequirement: {
    marginTop: spacing.l,
  },
  boxContent: {
    marginHorizontal: spacing.m,
  },
});
