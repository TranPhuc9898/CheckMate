import { borderRadius, colors, spacing } from "@src/libs/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const numColumns = 2;

export default StyleSheet.create({
  lineContainer: {
    marginVertical: spacing.m,
  },
  contentLine: {
    flex: 9,
  },
  contentCenter: {
    paddingLeft: spacing.m,
  },
  contentBtn: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnStyle: {
    width: 56,
    borderRadius: borderRadius.s,
  },
  spacingText: {
    marginVertical: spacing.s,
  },
  containerItemRoom: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: spacing.l,
  },
  imageBackground: {
    width: Math.round(width * 0.9),
    height: 250,
    borderTopLeftRadius: borderRadius.s,
    borderTopRightRadius: borderRadius.s,
  },
  imageFull: {
    width: "100%",
    height: "100%",
  },
  contentRoom: {
    backgroundColor: "rgba(66, 80, 175, 0.2)",
    padding: spacing.m,
    width: "60%",
    borderRadius: borderRadius.s,
  },
  roomName: {
    marginBottom: spacing.s,
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  backgroundImage: {
    width: width,
    height: height / 3,
  },
  imageFlatList: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: width / numColumns,
  },
  iconCloseStyle: {
    marginLeft: spacing.l,
    marginTop: spacing.xxxl,
    position: "absolute",
    padding: spacing.m,
  },
});
