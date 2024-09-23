import {
  borderRadius,
  colors,
  fontSize,
  fontWeightTheme,
} from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
  },
  scrollStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundContent: {
    backgroundColor: colors.background
  },
  containerHeader: {
    height: width,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  backgroundHeader: {
    width: width * 0.75,
    height: width * 0.55,
    marginVertical: spacing.l,
  },
  containerContent: {
    position: "absolute",
    top: width - 30,
    left: width * 0.1,
    width: width * 0.8,
    backgroundColor: colors.primary1,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: colors.primary3,
  },
  containerRole: {
    marginTop: 50,
  },
  paddingVerticalS: {
    paddingVertical: spacing.s,
  },
  imageRole: {
    width: 70,
    height: 60,
  },
  dividerStyle: {
    marginVertical: spacing.m,
  },
  boxProcedure: {
    marginVertical: spacing.m,
  },
  boxProcedureNumber: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.s,
    backgroundColor: colors.primary,
  },
  boxProcedureText: {
    backgroundColor: colors.primary3,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.s,
    padding: spacing.m,
    marginLeft: spacing.s,
    marginVertical: spacing.m,
    marginRight: spacing.xl,
  },
  txtRequire: {
    paddingHorizontal: spacing.m,
  },
  container: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "700",
    marginBottom: spacing.m,
    color: colors.white,
    allowFontScaling: false,
  },
  btnBack: {
    position: "absolute",
    left: 0,
    bottom: 10,
    top: 20,
    justifyContent: "flex-end",
    marginLeft: spacing.l,
    zIndex: 1,
  },
});
