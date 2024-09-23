import { StyleSheet } from "react-native";
import { spacing } from "@src/libs/theme";

export default StyleSheet.create({
  boxBottom: {
    paddingLeft: spacing.m,
    justifyContent: "center",
  },
  textPhone: {
    marginTop: spacing.s,
  },
  textRating: {
    marginLeft: spacing.s,
  },
  boxLeftBottom: {
    paddingTop: spacing.s,
    justifyContent: "center",
    alignItems: "center",
  },
  boxRating: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerLine: {
    justifyContent: "space-between",
    marginVertical: spacing.m,
  },
});
