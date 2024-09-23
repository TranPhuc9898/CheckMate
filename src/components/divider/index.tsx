import React from "react";
import { Divider, DividerProps } from "@rneui/themed";

interface ICustomDivider extends DividerProps {}

/**
 * Thanh ngang bottom cho flatlist giữa các item
 * @see https://reactnativeelements.com/docs/components/input
 */
const CustomDivider: React.FunctionComponent<ICustomDivider> = (
  props
) => {
  return <Divider {...props} />;
};

export default CustomDivider;
