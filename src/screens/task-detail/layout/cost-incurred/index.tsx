/**
 * @author HuuToan
 * @email [huutoan.nguyen@btaskee.com]
 * @create date 2023-03-16 14:49:13
 * @modify date 2023-03-16 14:49:13
 * @desc [CostIncurred]
 */

import React, { FC } from "react";
import { Box, Card, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import PromotionDetail from "./promotion";
import ExtraMoney from "./extraMoney";
import styles from "./styles";
interface ICostIncurred {
  promotion?: any;
  status?: string;
  extraMoney?: number;
  isLeader?: boolean;
  isMember?: boolean;
}

const CostIncurred: FC<ICostIncurred> = ({
  promotion,
  status,
  extraMoney,
  isLeader,
  isMember,
}) => {
  const I18n = React.useContext(LocalizationContext);
  if (!promotion && !extraMoney) {
    return null;
  }
  return (
    <Card>
      <Text
        style={styles.txtTitle}
        bold
        color="primary"
      >
        {I18n.t("TASK_DETAIL.COST_INCURRED")}
      </Text>

      {/* ExtraMoney */}
      <ExtraMoney
        isMember={isMember}
        extraMoney={extraMoney}
      />
      {/* End ExtraMoney */}

      {/* Promotion */}
      <PromotionDetail
        isLeader={isLeader}
        promotion={promotion}
        status={status}
      />
      {/* End promotion */}
    </Card>
  );
};

export default CostIncurred;
