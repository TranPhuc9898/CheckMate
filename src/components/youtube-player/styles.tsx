import {
  StyleSheet,
} from 'react-native';
import {colors, fontSize, spacing, borderRadius} from "@src/libs/theme";
// import helpers from "../../lib/helpers";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.grey1
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
