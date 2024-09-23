/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list carpet]
 */

import { FC, useContext } from "react";
import { Box, Divider, Text } from "@src/components";
import _ from "lodash";
import styles from "../styles";
import { getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";

interface ICarpet {
  carpet: any;
}

const ListCarpet: FC<ICarpet> = ({ carpet }) => {
  if (_.isEmpty(carpet)) {
    return null;
  }
  const I18n = useContext(LocalizationContext);

  return (
    <Box>
      {/* Divider */}
      <Box style={styles.containerMargin}>
        <Divider color="black" />
      </Box>
      {/* Carpet */}
      <Box
        alignCenter
        style={styles.containerMargin}
      >
        <Box
          flex
          row
        >
          <Text
            bold
            fontSize="m"
          >
            {I18n.t("TASK_DETAIL.CARPET")}
          </Text>
          <Box
            flex
            style={styles.qtyStyle}
          />
        </Box>
      </Box>
      {carpet?.map((item, index) => (
        <Box
          key={index}
          alignCenter
          style={styles.marginHorizontal}
        >
          <Box
            flex
            row
            style={styles.spacingText}
          >
            <Text
              color="grey1"
              fontSize="m"
            >
              {getTextWithLocale(item?.text)}
            </Text>
            <Box
              flex
              style={styles.qtyStyle}
            >
              <Text>{item?.quantity}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListCarpet;
