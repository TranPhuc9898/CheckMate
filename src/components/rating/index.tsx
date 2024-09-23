/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:07
 * @modify date 2022-10-12 10:07
 * @desc bage component
 */

import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "@src/components";
import Icon, { iconSize } from "@src/components/icon";
import { colors, spacing } from "@src/libs/theme";

const stars = [1, 2, 3, 4, 5];

interface IRate {
  /**
   * Number of rate
   */
  rate?: number;

  /**
   * Size of icon
   */
  size?: keyof typeof iconSize;

  /**
   * Style of rate
   */
  style?: any;

  /**
   * Style of colors
   */
  colors?: keyof typeof colors;

  /**
   * Return number star when click
   */
  onChange?: (numberStar: number) => void;
}

const CustomRate: React.FunctionComponent<IRate> = ({
  rate,
  size,
  style,
  colors,
  onChange,
}) => {
  const [starRate, setStarRate] = useState(rate);

  const onChangeStar = (numberStar: number) => {
    setStarRate(numberStar);
    onChange && onChange(numberStar);
  };

  // Không có function onClick thì sẽ không cho click
  const disabled = !onChange;
  return (
    <Box
      style={style}
      row
    >
      {stars.map((numberStar) => (
        <TouchableOpacity
          key={numberStar}
          testID={"rating" + numberStar.toString()}
          disabled={disabled}
          onPress={() => onChangeStar(numberStar)}
        >
          <Icon
            style={styles.iconStar}
            name={numberStar <= starRate ? "starFill" : "star"}
            size={size}
            color={colors ? colors : "primary"}
          />
        </TouchableOpacity>
      ))}
    </Box>
  );
};

CustomRate.defaultProps = {
  rate: 5,
  size: "m",
};

export default CustomRate;

const styles = StyleSheet.create({
  iconStar: {
    marginLeft: spacing.s,
  },
});
