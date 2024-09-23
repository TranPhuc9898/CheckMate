/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show budget go market]
 */

import React, { FC } from "react";
import { Box, Icon, PriceItem, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { getCountry } from "libs/helper";

interface ITypeHouseAndDuration {
  isGoMarket?: boolean;
  budgetGoMarket?: number;
}

const country = getCountry();

const BudgetGoMarket: FC<ITypeHouseAndDuration> = ({
  isGoMarket,
  budgetGoMarket,
}) => {
  const I18n = React.useContext(LocalizationContext);
  if (!isGoMarket || !budgetGoMarket) {
    return null;
  }
  return (
    <Box
      row
      alignCenter
      style={styles.lineContainer}
    >
      <Box
        row
        alignCenter
      >
        <Icon
          name="tip"
          color="secondary"
        />
      </Box>
      <Box
        flex
        row
        style={styles.contentLine}
      >
        <Text>{I18n.t("TASK_DETAIL.BUDGET_TO_MARKET")}</Text>
        <PriceItem
          cost={budgetGoMarket}
          priceStyle={{
            fontWeight: "bold",
          }}
          currencyStyle={{
            fontWeight: "bold",
          }}
        />
      </Box>
    </Box>
  );
};

export default BudgetGoMarket;
