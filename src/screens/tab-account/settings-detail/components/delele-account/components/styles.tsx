import { Dimensions, StyleSheet } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  image: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  textContent: {
    flex: 1,
    paddingTop: spacing.s,
  },
  boxContainer: {
    marginHorizontal: spacing.l,
    padding: spacing.l,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xxl,
    borderRadius: borderRadius.s,
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  textLogout: {
    marginLeft: spacing.m,
  },
  textLogoutNote: {
    marginTop: spacing.m,
  },
  boxContainer2: {
    paddingLeft: spacing.l,
    paddingRight: spacing.l,
  },
  checkBox: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  inputOtherReasonCancel: {
    borderColor: colors.grey4,
    padding: spacing.m,
    backgroundColor: colors.grey5,
  },
  inputStyle: {
    height: width / 3,
  },
  checkBox2: {
    width: spacing.xxl,
    height: spacing.xxl,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
  },
  paddingBox: {
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
  },
  paddingBox2: {
    paddingBottom: spacing.m,
  },
  warningBox: {
    flexDirection:"row",
    backgroundColor: colors.primary3,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    borderRadius: spacing.m,
  },
  textAgree: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  text: {
    paddingHorizontal: spacing.xl,
  },
  contentContainerStyle: {
    paddingBottom: 30
  },
  buttonDelete: {
    paddingTop: 10
  },
  btnDisabledStyle: {
    backgroundColor: colors.grey2
  },
  warningText:{
    paddingLeft:spacing.l
  }
});
