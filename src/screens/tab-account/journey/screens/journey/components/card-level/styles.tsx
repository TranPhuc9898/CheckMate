import { colors, spacing } from "libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  boxContainer: {
    position: "absolute",
    paddingHorizontal: spacing.xxxl,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    top: -30,
    borderRadius: 10,
    borderWidth: 1
  },
  containerLocked: {
    borderColor: colors.grey1,
    backgroundColor: colors.grey4,
  },
  boxContainerSuccess: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  boxContainerProcessing: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary3,
  },
  boxTxt: {
    marginLeft: 10
  },
  wrapCardLock: {
    marginTop: spacing.xxxl,
    backgroundColor: colors.grey4,
    borderColor: colors.grey1,
    borderWidth: 1,
  },
  wrapCardProcessing: {
    marginTop: spacing.xxxl,
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  wrapCardPassed: {
    marginTop: spacing.xxxl,
    borderColor: colors.success,
    borderWidth: 1,
    backgroundColor: colors.white
    // TODO: Đổi màu
    // backgroundColor: colors.grey5
  },
});
