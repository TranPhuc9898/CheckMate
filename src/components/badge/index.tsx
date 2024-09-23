/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:07
 * @modify date 2022-10-12 10:07
 * @desc badge component
 */

import { Badge } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

// full props with link: https://reactnativeelements.com/docs/components/badge

interface IBadge extends React.ComponentProps<typeof Badge> {}

const CustomBadge: React.FunctionComponent<IBadge> = (props) => {
  return (
    <Badge
      status="error"
      badgeStyle={styles.badgeStyle}
      {...props}
    />
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  badgeStyle: {
    minWidth: 10,
    minHeight: 10,
    borderRadius: 6,
    borderWidth: 0,
  },
});
