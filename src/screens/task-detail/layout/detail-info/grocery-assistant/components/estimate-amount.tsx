/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list cleaning tools]
 */

import { FC, useContext } from "react";
import { Box, Icon, PriceItem, Text } from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import { getCountry } from "libs/helper";

interface IEstimateAmount {
  estimatedAmount?: number;
}

const EstimateAmount: FC<IEstimateAmount> = ({ estimatedAmount }) => {
  const I18n = useContext(LocalizationContext);
  const country = getCountry();
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
          name="goMarket"
          color="secondary"
          size="l"
        />
      </Box>
      <Box
        flex
        style={styles.contentLine}
      >
        <Text>
          {I18n.t("TASK_DETAIL.ESTIMATED_PURCHASE_AMOUNT")}
          <PriceItem
            cost={estimatedAmount}
            priceStyle={styles.costStyle}
            currencyStyle={styles.currencyStyle}
          />
        </Text>
      </Box>
    </Box>
  );
};

export default EstimateAmount;
