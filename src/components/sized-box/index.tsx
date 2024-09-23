import React from "react";
import { StyleSheet } from "react-native";

import Box from "@components/box";

interface ISizedBox {
  width?: number;
  height?: number;
  color?: any;
  style?: any;
}

const SizedBox: React.FunctionComponent<ISizedBox> = ({ width, height, color, style }) => {
  return <Box style={StyleSheet.flatten([{ width, height, backgroundColor: color }, style])} />;
};
export default SizedBox;
