import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: spacing.s
  },

  priceStyle: {
    fontWeight: 'bold',
    fontSize: fontSize.m,
  }
});
