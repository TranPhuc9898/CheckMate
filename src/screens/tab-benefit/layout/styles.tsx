import { StyleSheet, Dimensions } from "react-native";
import { colors, borderRadius, spacing, fontSize } from "@src/libs/theme";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  boxItemReward: {
    padding: spacing.l,
    backgroundColor: colors.background,
    borderRadius: borderRadius.s,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    height: height * 0.3,
  },
  boxTitle: {
    marginTop: spacing.s,
  },
  txtTitle: {
    marginVertical: spacing.m,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
  },
  imageEmpty: {
    width: width * 0.5,
    height: width * 0.5,
  },
  txtEmpty: {
    textAlign: "center",
  },
  boxEmpty: {
    paddingBottom: spacing.m,
    paddingHorizontal: spacing.s,
  },
  txtDescription: {
    fontSize: 12
  },
  headerStyle: {
    fontSize: fontSize.xl,
    color: colors.white
  },
  styleFlatGrid: {
    paddingTop: 0,
    marginHorizontal: spacing.s
  },
  wrapPremium: {
    borderRadius: borderRadius.s,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    height: height * 0.3,
    overflow: "hidden",
    justifyContent: "center"
  },
  boxPremium: {
    padding: spacing.l
  },
  wrapImage: {
    // marginTop: spacing.xl
  },
  txtPremium: {
    paddingVertical: spacing.m,
  }
});
