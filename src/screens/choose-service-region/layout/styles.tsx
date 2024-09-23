import { Dimensions, StyleSheet } from "react-native";
import { spacing, colors, borderRadius } from "@src/libs/theme";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  transactionView: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  titleStyle: {
    color: colors.primary,
  },
  boxCard: {
    width: Math.round(width * 0.87),
    height: Math.round(height * 0.85),
  },
  boxContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  boxTitle: {
    paddingVertical: spacing.m,
  },
  imageMap: {
    marginVertical: spacing.xxl,
    width: 130,
    height: 130,
  },
  boxItem: {
    padding: spacing.l,
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowColor: colors.black,
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  boxBottom: {
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: spacing.l,
    marginBottom: spacing.l,
    backgroundColor: colors.secondary3,
    borderRadius: borderRadius.s,
  },
  container: {
    justifyContent: "space-between",
  },
  boxItemCheckbox2: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.grey5,
    marginBottom: spacing.l,
  },
  boxItemCheckbox: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.grey5,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowColor: colors.black,
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  boxItemService: {
    marginBottom: spacing.m,
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowColor: colors.black,
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  isStyleInActive: {
    borderColor: colors.grey5,
    borderWidth: 1,
  },
  boxConfirmFooter: {
    borderTopColor: colors.grey4,
    borderTopWidth: 1,
    paddingVertical: spacing.l,
  },
  boxConfirmItem: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.primary3,
    borderRadius: 5,
    marginBottom: spacing.m,
    marginRight: spacing.m,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  boxConfirmService: {
    marginTop: spacing.m,
  },
  boxConfirmDistrict: {
    marginTop: spacing.m,
  },
  boxContainerConfirmService: {
    marginTop: spacing.m,
  },
  leftButton: {
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: spacing.m,
  },
  rigthButton: {
    borderRadius: borderRadius.s,
    backgroundColor: colors.secondary,
    alignSelf: "stretch",
    alignItems: "center",
    paddingVertical: spacing.m,
  },
  boxRigthButton: {
    width: "50%",
    paddingLeft: spacing.s,
  },
  boxLeftButton: {
    width: "50%",
    paddingRight: spacing.s,
  },
});
