import { borderRadius, colors, spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  txtNothing: {
    marginTop: spacing.l,
  },
  actionButton: {
    padding: spacing.m,
    borderRadius: borderRadius.s,
    backgroundColor: colors.black1
  },
  containerCardSwipe: {
    paddingVertical:spacing.xl
  },
  cardSwipeItem: {
    alignItems: "center",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    paddingVertical: spacing.m,
  },
  imageItem: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xs,
    // backgroundColor: colors.primary,
    margin: spacing.l
  },
  imageItemIsRead: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xs,
    // backgroundColor: colors.grey3,
    margin: spacing.l
  },
  textItem: {
    flex: 1,
    minHeight: 25,
    justifyContent: "center",
    paddingLeft: spacing.l,
  },
  isRead: {
    width: spacing.m,
    height: spacing.m,
    borderRadius: 50,
    backgroundColor: colors.error,
    marginLeft: spacing.l,
  },
  underLine: {
    borderTopWidth: 1,
    borderTopColor: colors.grey2,
    alignItems: "center",
  },
  imageIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.xs
  },
  isReadBackRound: {
    backgroundColor: colors.grey4,
  },
  imageIconIsRead: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    tintColor: colors.grey1,
  },
  txtCreatedAt: {
    paddingTop: spacing.s
  },
  wrapItemNotification: {
    backgroundColor: colors.background,
    paddingRight: spacing.s
  },
  wrapBtnDelete: {
    paddingLeft: 15,
  },
});
