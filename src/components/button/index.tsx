/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-11 09:39
 * @modify date 2022-10-11 09:39
 * @desc custom button component
 */

import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  borderRadius,
  buttonSize,
  spacing,
} from "@src/libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

interface IButton extends React.ComponentProps<typeof Button> {
  /**
   * Button square with icon on text
   */
  square?: boolean;
}
/**
 * @see https://reactnativeelements.com/docs/components/button
 */
const CustomButton: React.FunctionComponent<IButton> = (props) => {
  if (props.square) {
  }
  return (
    <Button
      {...props}
      buttonStyle={[styles[props.size || "lg"], props.buttonStyle]}
      color={props.color || "secondary"}
      containerStyle={[styles.defaultContainerStyle, props.containerStyle]}
      titleProps={{
        style: [
          styles.titleStyle,
          {
            fontFamily: getFontFamilyByLocale().bold,
          },
          props?.titleStyle,
        ],
        allowFontScaling: false, // Disable font scaling for the title text
      }}
    />
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "transparent",
  },
  titleStyle: {
    fontSize: fontSize.l,
    color: colors.white,
    fontWeight: "bold",
    marginHorizontal: spacing.xxl,
  },
  sm: {
    height: buttonSize.sm,
    borderRadius: borderRadius.s,
  },
  md: {
    height: buttonSize.md,
    borderRadius: borderRadius.s,
    padding: 0,
  },
  lg: {
    height: buttonSize.lg,
    borderRadius: borderRadius.s,
  },
});
