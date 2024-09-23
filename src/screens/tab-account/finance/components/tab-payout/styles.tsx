import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "@src/libs/theme";
import { getBottomSpace } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  container: {
    marginBottom: getBottomSpace() ? getBottomSpace() : spacing.l,
  },
  cardStyle: {
    marginTop: spacing.xl,
    padding:0,
    overflow: "hidden",
  },
  containerItem: {},
});
