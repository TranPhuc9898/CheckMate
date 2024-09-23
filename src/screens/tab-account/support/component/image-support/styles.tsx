import { spacing } from "libs/theme";
import {Dimensions, StyleSheet} from "react-native"

const { width } = Dimensions.get("window");
export default StyleSheet.create({
    backgroundImageStyle: {
        width: Math.round((2 * width) / 3),
        height: Math.round((2 * width)/4),
        marginVertical: spacing.l,
      },
      text:{
        marginTop:spacing.l
      }

})