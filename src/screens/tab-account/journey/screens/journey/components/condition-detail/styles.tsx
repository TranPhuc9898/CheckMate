import { borderRadius, colors, fontSize, spacing } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export const { width } = Dimensions.get("window");

export default StyleSheet.create({
  wrapPercentage: {
    marginVertical: spacing.xl,
    paddingBottom: spacing.s
  },
  textCard: {
    paddingVertical: spacing.s
  },
  dividerStyle: {
    marginVertical: spacing.l
  },
  txtPercentage: {
    position: "absolute"
  },
  wrapLabelCondition: {
    position: "absolute",
    bottom: 0
  },
  iconStar: {
    paddingHorizontal: spacing.l
  },
  wrapExtraCondition: {
    padding: spacing.m,
    borderRadius: spacing.m,
    marginVertical: spacing.m,
    backgroundColor: colors.secondary3,
  },
  lottieTick: {
    position: "absolute",
    width: width/6,
    height: width/6
  },
  wrapRemain: {
    borderWidth: 1,
    marginTop: spacing.m,
    borderColor: colors.grey4,
    borderRadius: borderRadius.s,
  },
  wrapItemRemain: {
    padding: spacing.l,
  },
  dividerDetailStyle: {
    marginHorizontal: spacing.l
  },
  txtMarkDownStyle: {
    fontSize: fontSize.l,
    textAlign: "center",
    fontWeight: "bold"
  },
  wrapTxt: {
    paddingRight: spacing.l
  },
  txtWarning: {
    paddingLeft: spacing.s
  }
});
