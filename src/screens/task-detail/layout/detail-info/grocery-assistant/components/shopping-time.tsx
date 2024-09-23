/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show shopping time]
 */

import { FC, useContext } from "react";
import { Box, Icon, Text } from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";

interface IShoppingTime {
  duration?: any;
}

const ShoppingTime: FC<IShoppingTime> = ({ duration }) => {
  const I18n = useContext(LocalizationContext);

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
          name="clock"
          color="secondary"
          size="l"
        />
      </Box>
      <Box flex style={styles.contentLine}>
        <Text>
          {I18n.t("TASK_DETAIL.SHOPPING_TIME_LABEL")}
          <Text bold>
            {I18n.t("TASK_DETAIL.DURATION", { t: duration })}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default ShoppingTime;
