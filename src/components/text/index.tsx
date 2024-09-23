/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-11 09:17
 * @modify date 2022-10-11 09:17
 * @desc custom text component
 */

import { Text, StyleSheet, TextProps } from "react-native";
import {
  colors,
  fontSize as fontSizetheme,
  fontWeightTheme,
} from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

interface ICustomText extends TextProps {
  /**
   * Kích thước sẵn của text
   */
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * In đậm
   */
  bold?: boolean;
  /**
   * In nghiêng
   */
  italic?: boolean;
  /**
   * Font size
   */
  fontSize?: keyof typeof fontSizetheme;
  /**
   * Màu chữ
   */
  color?: keyof typeof colors;
  /**
   * Căn giữ
   */
  center?: boolean;
  /**
   * Cỡ chữ
   */
  fontWeight?: keyof typeof fontWeightTheme;
  left?: boolean;
  right?: boolean;
}

/**
 * Text component đã được custom
 * - variant?: "h1": 32 | "h2": 25 | "h3": 20 | "h4": 16 | "h5": 14 | "h6": 10;
 * - bold?: boolean;
 * - italic?: boolean;
 * - fontSize?: "s": 10 | "m": 14 | "l": 16 | "xl": 20 | "xxl": 25 | "xxxl": 32;
 * - fontWeight?: "s": 400 | "m": 500 | "l": 600 | "xl": 700;
 * - color?: keyof typeof colors;
 * - right
 * - center
 * - left
 * - Các thuộc tính của Text
 */
const CustomText: React.FunctionComponent<ICustomText> = ({
  variant,
  bold,
  italic,
  fontSize,
  color,
  center,
  fontWeight,
  left,
  right,
  ...other
}) => {
  let customStyle = {};
  if (variant) {
    customStyle = { ...styles[variant] };
  }
  if (bold) {
    customStyle["fontWeight"] = "bold";
    customStyle["fontFamily"] = getFontFamilyByLocale().bold;
  }
  if (italic) {
    customStyle["fontStyle"] = "italic";
  }
  if (fontSize) {
    customStyle["fontSize"] = fontSizetheme[fontSize];
  }
  if (color) {
    customStyle["color"] = colors[color];
  }
  if (center) {
    customStyle["textAlign"] = "center";
  }
  if (left) {
    customStyle["textAlign"] = "left";
  }
  if (right) {
    customStyle["textAlign"] = "right";
  }
  if (fontWeight) {
    customStyle["fontWeight"] = fontWeightTheme[fontWeight];
  }
  return (
    <Text
      {...other}
      allowFontScaling={false}
      style={[
        styles.defaultStyle,
        { fontFamily: getFontFamilyByLocale().normal },
        customStyle,
        other.style,
      ]}
    >
      {other.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: fontSizetheme.xxxl,
    fontWeight: "bold",
  },
  h2: {
    fontSize: fontSizetheme.xxl,
    fontWeight: "bold",
  },
  h3: {
    fontSize: fontSizetheme.xl,
    fontWeight: "bold",
  },
  h4: {
    fontSize: fontSizetheme.l,
    fontWeight: "bold",
  },
  h5: {
    fontSize: fontSizetheme.m,
  },
  h6: {
    fontSize: fontSizetheme.s,
  },
  defaultStyle: {
    fontSize: fontSizetheme.l,
    color: colors.black,
    // fontWeight: "400",
  },
});

export default CustomText;
