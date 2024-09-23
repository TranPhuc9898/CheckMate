import { StyleSheet, Dimensions } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";

const {width} = Dimensions.get("window");
const SIZE_ICON = 50;
const SIZE_IMAGE= Math.round(width/2);
const WIDTH_RIGHT_CONTENT_LOCKED = Math.round(width/6);

export default StyleSheet.create({
  leftContent: {
    marginRight: spacing.xl
  },
  description: {
    marginVertical: spacing.m
  },
  info: {
    borderTopWidth: 1,
    borderColor: colors.grey3,
    paddingTop: spacing.m
  },
  gauge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xl
  },
  wrapLock: {
    width: SIZE_ICON,
    height: SIZE_ICON,
    borderRadius: SIZE_ICON / 2,
    backgroundColor: colors.grey4
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
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: spacing.l
  },
  rightContentLocked: {
    width: WIDTH_RIGHT_CONTENT_LOCKED,
  },
  txtLocked: {
    color: colors.grey1
  },
  txtTimeRead: {
    marginLeft: 5
  },
  comingSoon: {
    width: SIZE_IMAGE,
    height: SIZE_IMAGE,
    marginBottom: spacing.l
  },
});
