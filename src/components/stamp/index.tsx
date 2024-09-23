import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { spacing } from "@src/libs/theme";
import Box from "components/box";
import { Image, Text } from "components";

const BACKGROUND_SUCCESS = require("@images/active-account/stamp-success.png");
const BACKGROUND_FALSE = require("@images/active-account/stamp-failed.png");

interface IStamp {
  /**
   * Title of stamp
   */
  title: string;
  /**
   * Size of stamp
   * @default "l"
   * @type "s" | "m" | "l"
   * @optional
   * @memberof IStamp
   */
  backgroundSize?: keyof typeof spacing;
  /**
   * Size of stamp
   * @default "l"
   * @type "s" | "m" | "l"
   * @optional
   * @memberof IStamp
   */
  titleSize?: keyof typeof spacing;
  /**
   * Type of stamp
   * @default "Success"
   * @type "success" | "failed"
   * @optional
   */
  type?: "success" | "failed";
  /**
   * TestID for testing
   * @optional
   * @type string
   */
  testID?: string;
  textStyle?: any,
}
/**
 * ### Title of stamp
 * title: string;
 *
 * ### Size of stamp
 * optional
 * ```
 * default "l"
 * ```
 * ```
 * size "s" | "m" | "l" | "xl" | "xxl" | "xxxl"
 * ```
 * ### Type of stamp
 * optional
 * ```
 * default "success"
 * ```
 * ```
 * type "success" | "failed"
 * ```
 */

const CustomStamp: React.FunctionComponent<IStamp> = ({
  title,
  testID,
  backgroundSize = "l",
  titleSize = "l",
  type = "success",
  textStyle,
}) => {
  return (
    <Box testID={testID}>
      <Image
        source={type === "success" ? BACKGROUND_SUCCESS : BACKGROUND_FALSE}
        style={{
          padding: spacing[backgroundSize],
        }}
      >
        <Text
          style={{
            transform: [{ rotate: "-15deg" }],
            fontSize: spacing[titleSize],
            ...textStyle
          }}
          color="white"
          bold
          center
        >
          {title}
        </Text>
      </Image>
    </Box>
  );
};

export default CustomStamp;

const styles = StyleSheet.create({});
