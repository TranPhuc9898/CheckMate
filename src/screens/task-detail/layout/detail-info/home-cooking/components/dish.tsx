/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show dish]
 */

import React, { FC } from "react";
import { Box, Divider, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import _ from "lodash";
import { capitalizedFirstStr } from "libs/helper";
import { colors } from "libs/theme";

interface IDish {
  numberDish: number;
  dishDetail?: any;
}

const Dish: FC<IDish> = ({ numberDish, dishDetail }) => {
  const I18n = React.useContext(LocalizationContext);

  // Render detail dish
  const _RenderDishDetail = () => {
    if (_.isEmpty(dishDetail)) {
      return (
        <Box flex>
          <Text>• {I18n.t("TASK_DETAIL.DISH_WAITING")}</Text>
          <Text>• {I18n.t("TASK_DETAIL.CALL_CUSTOMER_TO_UPDATE_DISH")}</Text>
        </Box>
      );
    }
    return (
      <Box flex>
        {dishDetail.map((item, index) => (
          <Text
            key={index}
            style={styles.spacingText}
          >
            - {capitalizedFirstStr(item?.name)}
          </Text>
        ))}
      </Box>
    );
  };

  return (
    <Box style={styles.containerDish}>
      <Box
        row
        between
      >
        <Text color="grey0">{I18n.t("TASK_DETAIL.NUMBER_OF_DISH")}</Text>
        <Text
          color="grey0"
          bold
        >
          {numberDish}
        </Text>
      </Box>
      <Divider
        width={1}
        color={colors.grey1}
        style={styles.dividerStyle}
      />
      {/* Render dish detail */}
      <_RenderDishDetail />
    </Box>
  );
};

export default Dish;
