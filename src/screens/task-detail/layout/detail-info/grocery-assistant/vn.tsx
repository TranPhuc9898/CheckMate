/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 10:20:56
 * @modify date 2023-03-17 10:20:56
 * @desc [Grocery assistant detail]
 */

import { FC, useContext } from "react";
import { Box, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import ShoppingTime from "./components/shopping-time";
import EstimateAmount from "./components/estimate-amount";
import styles from "./components/styles";
import { IDetailInfo } from "..";
import _ from "lodash";
import { Divider } from "@rneui/base";

const GroceryAssistantDetail: FC<IDetailInfo> = ({ duration, detail }) => {
  const I18n = useContext(LocalizationContext);
  if (_.isEmpty(detail)) {
    return null;
  }
  const listBuy = detail?.listBuy.split("\n") || [];

  const _renderListBuy = () => {
    if (_.isEmpty(listBuy)) {
      return null;
    }
    return (
      <Box
        flex
        style={styles.containerListBuy}
      >
        <Text>{I18n.t("TASK_DETAIL.SHOPPING_LIST")}</Text>
        <Divider
          width={1}
          style={styles.dividerStyle}
        />
        {listBuy.map((e, index) => (
          <Text key={index}>- {e}</Text>
        ))}
      </Box>
    );
  };

  return (
    <Box style={styles.container}>
      {/* List task */}
      <ShoppingTime duration={duration} />

      {/* Estimate amount */}
      <EstimateAmount estimatedAmount={detail?.estimatedAmount} />

      {/* List buy */}
      {_renderListBuy()}
    </Box>
  );
};

export default GroceryAssistantDetail;
