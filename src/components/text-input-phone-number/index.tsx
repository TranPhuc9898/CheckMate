/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-28 17:24
 * @modify date 2022-10-28 17:24
 * @desc [Text Input With PhoneNumber]
 */

import { StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  spacing,
} from "@src/libs/theme";
import { Box, Image, Text } from "@src/components";
import TextInput, { ICustomTextInput } from "@src/components/text-input";
import { HEIGHT_BUTTON } from "libs/constants";
import { getCountry } from "libs/helper";

interface ITextInputWithPhoneNumber extends ICustomTextInput {}

const TextInputWithPhoneNumber: React.FunctionComponent<
  ITextInputWithPhoneNumber
> = (props) => {
  const textStyleWithColor = {};
  if (props.color) {
    textStyleWithColor["color"] = colors[props.color];
  }

  const CountryCode = () => {
    const country = getCountry();
    return (
      <Box
        row
        style={styles.boxPhoneCode}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={country.flag}
        />
        <Text
          color="primary"
          style={[styles.txtPhoneCode, textStyleWithColor]}
        >
          {country.countryCode}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      row
    >
      <TextInput
        leftIcon={<CountryCode />}
        maxLength={12}
        {...props}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  boxPhoneCode: {
    // borderRadius: borderRadius.s,
    // borderWidth: 1,
    // borderColor: colors.black,
    // paddingHorizontal: spacing.m,
    paddingLeft: spacing.m,
    alignContent: "center",
    height: HEIGHT_BUTTON,
    // backgroundColor: 'blue'
  },
  txtPhoneCode: {
    color: colors.black,
    alignSelf: "center",
    marginLeft: spacing.s,
    fontWeight: "400",
    fontSize: fontSize.l,
  },
});

export default TextInputWithPhoneNumber;
