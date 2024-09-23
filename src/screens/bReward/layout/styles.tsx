import { Dimensions, StyleSheet } from "react-native";

import { borderRadius, colors, fontSize, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");
const SIZE_ICON = 40;
export const SLIDER_WIDTH = width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const IMAGE_SIZE = Math.round((width - spacing.l * 2) / 2.2);
const PADDING_BOTTOM = 50;

export default StyleSheet.create({
  boxBody: {
    minHeight: 66,
  },
  txtBranchName: {
    marginTop: spacing.s,
  },
  lottieReward: {
    width: SIZE_ICON,
    height: SIZE_ICON,
  },
  containerStyle: {
    paddingTop: spacing.l,
    backgroundColor: colors.white,
  },
  boxSlide: {
    paddingBottom: spacing.l,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    marginBottom: spacing.l,
  },
  slide: {
    backgroundColor: colors.white,
    borderRadius: spacing.l,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: spacing.l,
    marginTop: spacing.s,
  },
  slideItem: {
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: spacing.l,
  },
  imageItem: {
    width: IMAGE_SIZE,
    resizeMode: "contain",
    height: IMAGE_SIZE / 2,
    aspectRatio: 2,
    borderRadius: borderRadius.xs,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 2,
    borderTopLeftRadius: borderRadius.s,
    borderTopRightRadius: borderRadius.s,
  },
  loadingStyle: {
    marginTop: spacing.xl,
  },
  containerCard: {
    marginBottom: spacing.xxxl,
    padding: 0,
  },
  contentContainer: {
    padding: spacing.l,
  },
  headerStyle: {
    paddingBottom: spacing.m,
  },
  giftStyle: {
    paddingBottom: spacing.l,
  },
  boxInput: {
    flex: 1,
    marginRight: spacing.l,
    backgroundColor: colors.grey5,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: borderRadius.s,
    flexDirection: "row",
  },
  inputStyle: {
    backgroundColor: colors.white,
    marginBottom: 0,
  },
  boxIcon: {
    borderRadius: spacing.l,
    backgroundColor: colors.grey5,
    // width: SIZE_ICON,
    height: SIZE_ICON,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapInput: {
    paddingHorizontal: spacing.l,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.m,
    flexDirection: "row",
    position: "absolute",
    right: 0,
    left: 0,
    zIndex: 99,
  },
  txtSearch: {
    marginLeft: spacing.l,
  },
  itemService: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderColor: colors.secondary,
    borderWidth: 1,
    margin: spacing.s,
    borderRadius: borderRadius.s,
    backgroundColor: colors.secondary3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCategories: {
    backgroundColor: colors.secondary,
  },
  activeCategoriesIcon: {
    backgroundColor: colors.secondary,
  },
  wrapViewMore: {
    justifyContent: "space-between",
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  iconPoint: {
    marginRight: spacing.s,
  },
  boxPoint: {
    marginTop: spacing.m,
    justifyContent: "space-between",
  },
  buttonNotification: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    marginBottom: spacing.l,
    color: colors.white,
  },
  rightButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "flex-end",
    marginBottom: spacing.l,
    marginRight: spacing.l,
  },
  iconNotifycation: {
    width: 24,
    height: 24,
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 2,
  },
  clearButton: {
    marginBottom: spacing.s,
  },
  btnBack: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 20,
    justifyContent: "flex-end",
    marginLeft: spacing.l,
    zIndex: 1,
  },
  flashSale: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 0,
    left: spacing.l,
  },
  lottieTick: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  boxFlashSale: {
    paddingVertical: spacing.s,
  },
  btnRedemNow: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.l,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAction: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.l,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
    justifyContent: "center",
    alignItems: "center",
  },
  boxServices: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
  },
  boxContent: {
    justifyContent: "space-between",
    paddingHorizontal: spacing.l,
  },
  iconCategories: {
    width: spacing.xxl,
    height: spacing.xxl,
    marginRight: spacing.s,
  },
  imageInfoItem: {
    width: width / 3,
    height: width / 4,
  },
  txtTitle: {
    textAlign: "right",
    marginTop: spacing.m,
    lineHeight: spacing.xxl,
  },
  txtContent: {
    marginVertical: spacing.l,
    lineHeight: spacing.xxl,
  },
  containerCarousel: {
    paddingLeft: spacing.l,
  },
  txtLabelType: {
    fontSize: 18,
  },
  containerContentScroll: {
    paddingBottom: PADDING_BOTTOM,
  },
  linePoint: {
    textDecorationLine: "line-through",
    color: colors.grey1,
    textAlign: "center",
    marginLeft: spacing.s,
  },
  boxDivider: {
    paddingVertical: spacing.l,
  },
  sizeDivider: {
    marginHorizontal: spacing.xxxl,
  },
});
