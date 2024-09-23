/**
 * @author [QuanNguyen]
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-05-25 15:24:53
 * @modify date 2023-05-25 15:24:53
 * @desc [CustomMarkDownText]
 */

import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "libs/theme";
import { getFontFamilyByLocale } from "libs/helper";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { Text } from "components";

interface ICustomMarkDownText extends React.ComponentProps<typeof MarkdownIt> {
  text: string;
  center?: boolean;
  textStyle?: {};
  paragraphStyle?: {};
  linkStyle?: {};
  bulletListIcon?: {};
}

/**
 * Text component đã được custom
 * - text: Nội dung bên được hiển thị
 * - center?: boolean;
 * - paragraphStyle?: Các style Box ngoài Text. Ví dụ: margin, padding,...
 * - textStyle?: Các style của Text. Ví dụ: fontSize, color,...
 * - linkStyle?: Các style cho link
 */
const CustomMarkDownText: React.FunctionComponent<ICustomMarkDownText> = ({
  text,
  center,
  textStyle,
  paragraphStyle,
  linkStyle,
  bulletListIcon,
  ...other
}) => {
  const customTextStyle = {
    lineHeight: 22,
    ...textStyle,
  };

  return (
    <Markdown
      style={{
        paragraph: { ...styles.paragraph, ...paragraphStyle },
        link: { ...styles.link, ...linkStyle },
        strong: styles.strong,
        bullet_list: styles.bullet_list,
        bullet_list_icon: { ...styles.bullet_list_icon, ...bulletListIcon},
        code_inline: styles.textgroup,
        textgroup: {
          textAlign: center ? "center" : null,
          ...styles.textgroup,
        },
        ...other,
      }}
      rules={{
        textgroup: (node, children) => {
          return (
            <Text
              key={node.key}
              style={customTextStyle}
              allowFontScaling={false}
            >
              {children}
            </Text>
          );
        },
      }}
    >
      {text}
    </Markdown>
  );
};

const styles = StyleSheet.create({
  bullet_list_icon: {
    marginTop: 3,
  },
  bullet_list: {
    fontFamily: getFontFamilyByLocale().normal,
  },
  textgroup: {
    fontFamily: getFontFamilyByLocale().normal,
    // fontSize: fontSize.l,
  },
  strong: {
    fontWeight: "600", // android
    fontFamily: getFontFamilyByLocale().bold, // ios
  },
  link: {
    color: colors.primary,
  },
  paragraph: {
    // marginTop: 5,
    // marginBottom: 5,
  },
});
export default CustomMarkDownText;
