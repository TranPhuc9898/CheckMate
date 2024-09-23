import { StyleSheet } from "react-native";
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from "@src/libs/theme";

export default StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: spacing.s,
  },

  priceStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
  boxItemSchedule: {
    paddingVertical: spacing.m,
    backgroundColor: colors.grey5,
    borderRadius: borderRadius.s,
    width: "32%",
    justifyContent: "center",
    alignItems: "center",
  },

  boxItemScheduleActive: {
    backgroundColor: colors.primary3,
  },

  boxSchedule: {
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.s,
  },
  boxWeekday: {
    width: "20%",
    marginLeft: -spacing.l,
    borderRightWidth: 1,
    borderRightColor: colors.grey2,
    paddingVertical: spacing.s,
  },
  boxUpdate: {
    marginTop: spacing.l,
    marginBottom: spacing.l,
  },
  boxWorktime: {
    width: 60,
    height: 25,
    backgroundColor: colors.primary3,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
  },
  boxBusyTime: {
    width: 60,
    height: 25,
    backgroundColor: colors.grey5,
    borderRadius: borderRadius.s,
    marginRight: spacing.m,
  },
  boxBottom: {
    marginVertical: spacing.s,
    flex: 1,
  },
  boxNote: {
    padding: spacing.s,
    marginHorizontal: -spacing.m,
    marginVertical: spacing.m,
  },
  textNote: {
    flex: 1,
    marginLeft: spacing.s,
  },
});
