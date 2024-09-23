import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Input } from "@rneui/themed";
import { LocalizationContext } from "@src/libs/context";
import { TouchableOpacity } from "react-native";
import { Icon } from "@src/components";
import { fontSize, colors, borderRadius, spacing } from "@src/libs/theme";
import { HEIGHT_BUTTON } from "libs/constants";
import {
  getCountry,
  getFontFamilyByLocale,
  validPhoneNumber,
} from "libs/helper";
/**
 * @see https://reactnativeelements.com/docs/components/input
 */
export interface ICustomTextInput extends React.ComponentProps<typeof Input> {
  forwardedRef?: any;
  // màu chung của text input
  color?: keyof typeof colors;
  validType?: any;
  showEyeIcon?: boolean;
  onBlur?: () => void;
  // Function được gọi sau khi validate để set disabled cho những button submit
  setDisabled?: (disabled: boolean) => void;
}

const CustomTextInput: React.FunctionComponent<ICustomTextInput> = ({
  forwardedRef,
  color,
  validType,
  onBlur,
  setDisabled,
  showEyeIcon,
  ...props
}) => {
  const I18n = React.useContext(LocalizationContext);
  const [error, setError] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

  // Get country state
  const country = getCountry();

  const handleError = (error) => {
    setError(error);
    setDisabled && setDisabled(true);
  };

  const checkError = () => {
    // Check required
    if (validType?.includes("required") && !props?.value.trim()) {
      return handleError("VALIDATE.THIS_FIELD_IS_REQUIRED");
    }
    // Check length password
    if (
      validType?.includes("password") &&
      (6 > props?.value.length || 12 < props?.value.length)
    ) {
      return handleError("VALIDATE.ERROR_PASSWORD_LENGTH");
    }
    // Check length password(+value)
    if (validType?.includes("number") && isNaN(+props?.value)) {
      return handleError("VALIDATE.TYPE_INPUT_INVALID");
    }
    // Check length password(+value)
    if (
      validType?.includes("phone") &&
      !validPhoneNumber(props?.value.trim(), country.countryCode)
    ) {
      return handleError("ERROR.PHONE_NUMBER_SYNTAX_IS_INCORRECT");
    }
    setDisabled && setDisabled(false);
    return setError("");
  };

  const _handleBlur = () => {
    onBlur && onBlur();
    checkError();
  };

  // Chỉnh màu của label, border, textInput
  const labelStyleWithColor = {};
  const inputContainerStyleWithColor = {};
  // Color text input black is default
  const inputStyleWithColor = {
    color: colors.black,
  };
  if (color) {
    labelStyleWithColor["color"] = colors[color];
    inputContainerStyleWithColor["borderColor"] = colors[color];
    inputStyleWithColor["color"] = colors[color];
  }

  const EyeIcon = () => {
    if (!showEyeIcon) return null;
    return (
      <TouchableOpacity
        style={styles.btnShowPass}
        onPress={() => setSecureTextEntry(!secureTextEntry)}
      >
        <Icon
          name={secureTextEntry ? "eyeOpen" : "eyeSlash"}
          size="l"
          color={color ? color : "black"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Input
      maxLength={200}
      secureTextEntry={showEyeIcon ? secureTextEntry : false}
      rightIcon={<EyeIcon />}
      {...props}
      ref={forwardedRef}
      allowFontScaling={false}
      onBlur={_handleBlur}
      errorMessage={error ? I18n.t(error) : null}
      labelStyle={[
        styles.defaultLabelStyle,
        {
          fontFamily: getFontFamilyByLocale().bold,
        },
        props.labelStyle,
        labelStyleWithColor,
      ]}
      labelProps={{
        allowFontScaling: false, // Disable font scaling for the title text
      }}
      inputContainerStyle={[
        styles.defaultInputContainerStyle,
        inputContainerStyleWithColor,
        props.inputContainerStyle,
      ]}
      inputStyle={[
        styles.defaultInputStyle,
        {
          fontFamily: getFontFamilyByLocale().normal
        },
        inputStyleWithColor,
        props.inputStyle,
      ]}
      containerStyle={[styles.defaultContainerStyle, props.containerStyle]}
      errorStyle={[
        styles.defaultErrorStyle,
        {
          fontFamily: getFontFamilyByLocale().normal,
        },
        props.errorStyle,
      ]}
      textAlignVertical={props.textAlignVertical || "center"}
      placeholderTextColor={colors.grey2}
      selectionColor={colors.primary2}
    />
  );
};

const styles = StyleSheet.create({
  defaultErrorStyle: {
    textAlign: "right",
    color: colors.error,
  },
  defaultContainerStyle: {
    paddingHorizontal: 0,
  },
  defaultLabelStyle: {
    fontWeight: "700",
    fontSize: fontSize.m,
    color: colors.black,
    marginBottom: spacing.s,
    lineHeight: 20,
  },
  defaultInputContainerStyle: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: borderRadius.s,
  },
  defaultInputStyle: {
    fontSize: fontSize.l,
    color: colors.black,
    height: HEIGHT_BUTTON,
    paddingHorizontal: spacing.m,
    ...Platform.select({
      android: {
        paddingTop: 1,
        paddingBottom: 0,
        textAlignVertical: "center",
      },
      ios: {
        paddingBottom: 1,
      },
    }),
  },
  btnShowPass: {
    marginHorizontal: spacing.m,
  },
});

export default CustomTextInput;
