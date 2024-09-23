import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: spacing.l,
  },
  priceStyle: {
    fontWeight: 'bold',
    fontSize: fontSize.m,
  },
  buttonStyle: {
    width: '40%'
  }
});
