/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2023-03-16 14:02:06
 * @modify date 2023-03-16 14:02:06
 * @desc [Promotion detail]
 */

import React, { FC } from "react";
import { Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import PriceItem from "components/price";
import { statusTask } from "libs/config";
interface IPromotionDetail {
  promotion: any;
  status: string;
  isLeader?: boolean;
}

const PromotionDetail: FC<IPromotionDetail> = ({
  promotion,
  status,
  isLeader,
}) => {
  const I18n = React.useContext(LocalizationContext);
  // Xử lý với task promotion sau
  if (Boolean(status !== statusTask.confirmed) || !promotion) {
    return null;
  }

  return (
    <Text
      testID="promotionValue"
      style={styles.boxPromotion}
    >
      <Text color="secondary">+</Text>
      {/* Price */}
      <PriceItem
        cost={promotion}
        priceStyle={styles.promotionCost}
        currencyStyle={styles.currencyStyle}
      />{" "}
      <Text>
        {isLeader
          ? I18n.t("TASK_DETAIL.DESCRIPTION_FOR_PROMOTION_LEADER")
          : I18n.t("TASK_DETAIL.DESCRIPTION_FOR_PROMOTION")}
      </Text>
    </Text>
  );
};

export default PromotionDetail;
