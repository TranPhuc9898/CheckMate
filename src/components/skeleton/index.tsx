/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-14 17:05
 * @modify date 2022-10-14 17:05
 * @desc Loading skeleton
 */

import React from "react";
import { StyleSheet } from "react-native";
import { Skeleton, SkeletonProps } from "@rneui/themed";
import { spacing } from "@src/libs/theme";

interface ISkeleton extends SkeletonProps {}

const defaultProps = {
  height: spacing.xl,
  // width: 20,
};

/**
 * Hiển thị loading xám trong khi loading API
 * @see https://reactnativeelements.com/docs/components/skeleton
 */
const CustomSkeleton: React.FunctionComponent<ISkeleton> = (props) => {
  return (
    <Skeleton
      {...props}
      skeletonStyle={[styles.defaultStyle, props.skeletonStyle]}
    />
  );
};

CustomSkeleton.defaultProps = defaultProps;

const styles = StyleSheet.create({
  defaultStyle: {
    // backgroundColor: 'red'
  }
});

export default CustomSkeleton;
