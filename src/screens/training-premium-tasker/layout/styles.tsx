import { Dimensions, StyleSheet } from "react-native";

import { colors, fontSize, spacing } from "@src/libs/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  txtInstruction: {
    marginVertical: spacing.xxl,
  },
  boxButton: {
    marginBottom: spacing.l,
  },
  boxButtonQuit: {
    paddingVertical: spacing.l,
    justifyContent: "center",
  },
  txtPassedTitle: {
    textAlign: "center",
  },
  txtPanel: {},
  txtContentPassedTest: {
    marginLeft: spacing.l,
  },
  boxAddress: {
    paddingLeft: spacing.l,
  },
  boxPanel: {
    marginTop: spacing.l,
    marginBottom: spacing.xl,
  },
  boxAddressDetail: {
    marginVertical: spacing.s,
  },
  paddingContainer: {
    paddingBottom: spacing.l,
  },

  /* ------------------------------- Instruction ------------------------------ */
  title: {
    textAlign: "center",
    fontSize: fontSize.xl,
    fontWeight: "300",
    marginBottom: spacing.l,
  },
  header: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey4,
  },
  headerText: {
    fontSize: fontSize.l,
    width: "90%",
  },
  content: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  active: {
    backgroundColor: colors.white,
  },
  inactive: {
    backgroundColor: colors.white,
  },
  selectors: {
    marginBottom: spacing.m,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: colors.background,
    padding: spacing.m,
  },
  activeSelector: {
    fontWeight: "normal",
  },
  selectTitle: {
    fontSize: fontSize.l,
    padding: spacing.m,
  },
  txtValue: {
    fontSize: fontSize.l,
    marginBottom: spacing.s,
  },
  imgStyle: {
    marginVertical: spacing.l,
    width: width / 2,
    height: width / 2,
  },
});
