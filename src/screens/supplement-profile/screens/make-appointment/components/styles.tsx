import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxDate: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.s,
    borderColor: colors.secondary3,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.m,
    borderWidth: 1,
    marginHorizontal: spacing.s,
    minWidth: 82,
  },
  dividerStyle: {
    marginVertical: spacing.m,
  },
  backgroundPicked: {
    backgroundColor: colors.secondary,
  },
  boxTime: {
    flex: 1,
    padding: spacing.l,
    borderRadius: borderRadius.s,
    borderColor: colors.secondary3,
    borderWidth: 1,
    marginHorizontal: spacing.s,
    marginVertical: spacing.l,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  dateDisabled: {
    backgroundColor: colors.grey4,
  },
  txtDisabled: {
    color: colors.grey1,
  }
});
