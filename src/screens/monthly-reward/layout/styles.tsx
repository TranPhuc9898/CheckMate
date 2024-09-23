import { colors, spacing } from 'libs/theme';
import { Dimensions, StyleSheet } from 'react-native'

const {width} = Dimensions.get("window");
export default StyleSheet.create({
  image: {
    width: Math.round((2 * width) / 3),
    height: Math.round((2 * width) / 3),
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: spacing.m,
    padding: spacing.xl,
    margin: spacing.xl,
  },
});