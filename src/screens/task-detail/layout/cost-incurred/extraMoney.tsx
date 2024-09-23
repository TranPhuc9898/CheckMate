/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2023-03-16 14:02:06
 * @modify date 2023-03-16 14:02:06
 * @desc [ExtraMoney detail]
 */

import React, { FC } from "react";
import { Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import PriceItem from "components/price";
interface IExtraMoneyDetail {
  extraMoney: any;
  isMember?: boolean;
}

const ExtraMoney: FC<IExtraMoneyDetail> = ({ extraMoney, isMember }) => {
  const I18n = React.useContext(LocalizationContext);

  if (!extraMoney) {
    return null;
  }
  return (
    <Text
      testID="extraMoney"
      style={styles.boxPromotion}
    >
      <Text color="secondary">+</Text>
      <PriceItem
        cost={extraMoney}
        priceStyle={styles.promotionCost}
        currencyStyle={styles.currencyStyle}
      />{" "}
      <Text>
        {isMember
          ? I18n.t("TASK_DETAIL.MONEY_GET_MORE_MEMBER")
          : I18n.t("TASK_DETAIL.MONEY_GET_MORE")}
      </Text>
    </Text>
  );
};

export default ExtraMoney;
