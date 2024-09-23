import { Dimensions, StyleSheet } from "react-native";
import { fontSize, spacing, colors } from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  boxButton: {
    paddingVertical: spacing.m,
    marginBottom: spacing.xl,
  },
  description: {
    marginVertical: spacing.l,
    textAlign: "center",
  },
  txtActivation: {
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center" },
  codeFieldRoot: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: spacing.xl,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: spacing.m,
    marginHorizontal: spacing.m,
  },
  cellText: {
    color: colors.black,
    fontSize: fontSize.l,
    fontFamily: getFontFamilyByLocale().normal,
    textAlign: "center",
  },
  focusCell: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  textHello: {
    paddingTop: spacing.m,
    fontSize: fontSize.xl,
  },
  text: {
    marginLeft: spacing.s,
  },
  image: {
    width: Math.round((width) / 3),
    height: Math.round((width) / 3),
  },
  imageContainer: {
    marginTop: spacing.m,
    borderRadius: spacing.xxl,
    overflow: "hidden",
  },
  imageContainer2: {
    paddingTop: spacing.l,
  },
});
