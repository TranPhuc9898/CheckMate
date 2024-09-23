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
  },
  buttonStyle: {
    width: '50%'
  },
  wrapDropdown: {
    borderRadius: 5,
    borderColor: colors.grey1,
    borderWidth: 1,
    paddingVertical: spacing.m,
    paddingLeft: spacing.l,
    paddingRight: spacing.m
  },
  containerCheckBox: {
    paddingVertical: spacing.l
  },
  txtStyle: {
    fontWeight: "400",
    fontSize: fontSize.l,
  },
  txtCheckedStyle: {
    fontWeight: "500",
    fontSize: fontSize.l,
    color: colors.primary
  },
  txtLabel: {
    marginRight: 15
  }
});
