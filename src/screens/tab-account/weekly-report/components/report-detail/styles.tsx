import { StyleSheet } from "react-native";
import { colors, borderRadius, spacing, fontFamily, fontSize } from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
    marginTop: spacing.m,
    borderTopWidth: 1, 
    borderTopColor: colors.grey1
  },
  boxIteam: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: spacing.s,
  },

  boxBlowRating: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: spacing.l,
    marginBottom: spacing.s
  },

  boxRating: {
    marginTop: spacing.s
  },

  priceStyle: {
    fontWeight: 'bold',
    fontSize: fontSize.m,
  },
  textTask: {
    marginLeft: spacing.s
  }
});
