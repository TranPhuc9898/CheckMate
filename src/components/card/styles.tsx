import { colors, spacing } from "libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.l,
    borderRadius: spacing.l,
    margin: spacing.l,
    marginTop: 0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  containerPremium: {
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    margin: spacing.l,
    marginTop: 0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: "hidden"
  },
  styleBackgroundImage: {
    paddingBottom: 0,
    padding: spacing.l
  }
});
