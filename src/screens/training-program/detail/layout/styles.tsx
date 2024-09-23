import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";

const { width } = Dimensions.get("window");

const SIZE_IMAGE = Math.round(width / 4);
const SIZE_ICON = 60;

export default StyleSheet.create({
  wrapLock: {
    width: SIZE_ICON,
    height: SIZE_ICON,
    borderRadius: SIZE_ICON / 2,
    backgroundColor: colors.grey4,
  },
  lockContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    margin: spacing.l,
    marginTop: 0,
    borderRadius: spacing.l,
  },
  status: {
    marginLeft: spacing.s,
  },
  image: {
    width: SIZE_IMAGE,
    height: SIZE_IMAGE,
  },
  txtReadingTime: {
    fontSize: fontSize.m,
  },
  txtDescription: {
    marginVertical: spacing.m,
    fontSize: fontSize.m,
  },
  leftContent: {
    marginRight: spacing.m,
  },
  info: {
    borderTopWidth: 1,
    borderColor: colors.grey3,
    paddingTop: spacing.m,
  },
  txtLocked: {
    color: colors.grey1,
  },
  containerDisabled: {
    backgroundColor: colors.grey4,
    opacity: 0.5,
  },
  buttonStyle: {
    paddingHorizontal: spacing.l,
  },
  iconCall: {
    marginRight: spacing.s
  },
  boxStampFailed: {
    position: "absolute",
    left: "20%",
    top: "25%",
  },
  boxStampSuccess: {
    position: "absolute",
    left: "35%",
    top: "20%",
  },
  boxButtonCall: {
    position: "absolute",
    bottom: spacing.xxxl,
    right: spacing.xxxl,
  }
});
