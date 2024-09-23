import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
// Width bao bên ngoài item
export const SLIDER_WIDTH = width - 2*spacing.l;
// Width của item
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);
const MIN_HEIGH_ITEM = 100;
const HEIGH_CONTENT = 65;

export default StyleSheet.create({
  text: {
    paddingLeft: spacing.m,
    justifyContent: "space-between",  
  },
  image:{
    width: width/5,
    height: width/5,
    borderRadius: borderRadius.xs,
  },
  underLine:{
    marginTop:spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.grey2,
    alignItems: "center",
  },
  containerStylePagination: {
    paddingVertical: 0,
  },
  pagination:{
    paddingTop:spacing.l,
  },
  cardStyle: {
    paddingVertical: spacing.xl,
    paddingHorizontal: 0
  },
  dotStyle: {
    width: spacing.m,
    height: spacing.m,
    borderRadius: spacing.s,
    backgroundColor: colors.primary,
  },
  inactiveDotStyle: {
    backgroundColor: colors.grey0,
  },
  wrapImage: {
    paddingHorizontal: spacing.l,
  },
  wrapItemNotifySystem: {
    height: MIN_HEIGH_ITEM,
    justifyContent: "center",
    overflow: "hidden",
  },
  dividerStyle: {
    marginVertical: spacing.xl
  },
  txtMarkDown: {
    marginTop: spacing.s,
    // fontSize: fontSize.m,
    // lineHeight: 18
  },
  txtMarkDownRead: {
    // fontSize: fontSize.m,
    color: colors.grey1,
    marginTop: spacing.s
    // lineHeight: 18
  },
  wrapContentNotificationSystem: {
    height: HEIGH_CONTENT,
    overflow: "hidden"
  },
  txtTitle: {
    paddingLeft: spacing.l
  }
});
