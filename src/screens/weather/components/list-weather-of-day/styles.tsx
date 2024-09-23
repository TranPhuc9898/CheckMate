import { StyleSheet } from "react-native";

import { spacing } from "@src/libs/theme";

export default StyleSheet.create({
  container: {
    padding: spacing.l,
    paddingBottom: spacing.xxl,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: spacing.s,
  },
  boxItem: {
    padding: spacing.l,
    borderRadius: 5,
    backgroundColor: "rgba(145, 132, 110, 0.2)",
    justifyContent: "space-between",
    marginBottom: spacing.l,
  },
  boxContent: {
    width: "65%",
  },
  boxTemC: {
    width: "35%",
  },
  txtContent: {
    marginTop: spacing.m,
  },
  txtByDate: {
    marginVertical: spacing.l,
  },
});
