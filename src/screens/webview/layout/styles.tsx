import { colors } from "libs/theme";
import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%'
  },
  spin: {
    width: "0%",
    height: "100%",
    backgroundColor: colors.secondary,
  },
  container: {
    width: "100%",
    height: 3,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
