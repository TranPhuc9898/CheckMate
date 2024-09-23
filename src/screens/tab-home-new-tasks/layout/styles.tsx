import { borderRadius, colors, fontSize } from "@src/libs/theme";
import { spacing } from "@src/libs/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  taskWaitingContainer: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.s,
    marginHorizontal: 7,
  },
  itemTaskWaitingContainer: {
    paddingVertical: spacing.l,
    marginLeft: spacing.xxl,
    marginRight: spacing.s,
  },
  lineTaskWaiting: {
    paddingVertical: spacing.l
  },
  lastTaskContainer: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.s,
    marginHorizontal: 7,
    padding: spacing.s,
  },
  btnScrollDown: {
    backgroundColor: colors.primary1,
    height: 40,
    width: 40,
    borderRadius: borderRadius.s,
    alignContent: "flex-end",
  },
  btnScrollUp: {
    backgroundColor: colors.primary1,
    borderRadius: borderRadius.s,
    margin: spacing.s,
  },
  btnToTaskDetail: {
    backgroundColor: colors.primary1,
    // height: 36,
    width: 64,
    borderRadius: borderRadius.s,
    alignContent: "flex-end",
    marginRight: spacing.s,
  },
  positionIcon: {
    position: "absolute",
    top: 0,
    left: 3,
  },
  containerSkeleton: {
    marginTop: spacing.l,
  },
  containerFlatList: {
    marginVertical: spacing.l,
    paddingBottom: spacing.l,
  },
  containerHeaderComponent: {
    marginBottom: spacing.l,
  },
  wrapBtnFilter: {
    height: 50,
    width: 50,
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  txtFilter: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.m,
    borderRadius: borderRadius.s,
    justifyContent: "center",
    alignItems: "center",
  },
  totalWaitingTask: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: spacing.s,
    height: spacing.xxl,
    borderColor: "white",
  },
  iconLeft: {
    marginLeft: spacing.m,
  },
  txtTaskDate: {
    marginRight: spacing.m,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.l,
  },
  paddingTop: {
    paddingTop: spacing.l,
  },
  loadingStyle: {
    marginBottom: spacing.l,
  },
  lottieWaiting: {
    width: 50,
    height: 50,
  },
});
