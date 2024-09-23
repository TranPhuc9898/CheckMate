import React from "react";
import { StyleSheet } from "react-native";
import { CheckBox, CheckBoxProps } from "@rneui/themed";
import { colors } from "libs/theme";
import { getFontFamilyByLocale } from "libs/helper";

interface ICheckbox extends CheckBoxProps {}
/**
 * @see https://reactnativeelements.com/docs/components/checkbox
 */
const CustomCheckBox: React.FunctionComponent<ICheckbox> = (props) => {
  const checkedColor = props.disabled ? colors.grey1 : colors.black;
  return (
    <CheckBox
      {...props}
      fontFamily={getFontFamilyByLocale().normal}
      textStyle={[styles.defaultTextStyle, props.textStyle]}
      uncheckedColor={props?.uncheckedColor || checkedColor}
      checkedColor={props?.checkedColor || checkedColor}
    />
  );
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: colors.black,
  },
});

export default CustomCheckBox;
