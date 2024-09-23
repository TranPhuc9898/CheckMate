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

  const _renderCustomArea = (customArea, quantityCustomArea) => {
    if (customArea && quantityCustomArea) {
      return (
        <Box row>
          <Box flex>
            <Text
              fontSize="m"
              color="grey1"
              style={styles.spacingText}
            >
              {I18n.t("TASK_DETAIL.DISINFECTION_AREA_CUSTOM", {
                t: customArea,
              })}
            </Text>
          </Box>
          <Box
            flex
            style={styles.qtyStyle}
          >
            <Text fontSize="m">{quantityCustomArea}</Text>
          </Box>
        </Box>
      );
    }
  }
  return (
    <Box>
      {carpet?.map((item, index) => (
        <Box key={index}>
          {/* Divider */}
          <Box style={styles.containerMargin}>
            <Divider color="black" />
          </Box>
          <Box
            alignCenter
            style={styles.containerRecord}
          >
            <Box
              flex
              row
            >
              <Box>
                <Text
                  bold
                  fontSize="m"
                >
                  {I18n.t("TASK_DETAIL.CARPET")} -{" "}
                  {getTextWithLocale(item?.text)}
                </Text>
              </Box>
              <Box
                flex
                style={styles.qtyStyle}
              />
            </Box>
            {_renderCustomArea(item?.customArea, item?.quantityCustomArea)}
            {/* Type carpet */}
            {item?.type?.map((e, index) => (
              <Box
                flex
                row
                key={index}
              >
                <Box flex>
                  <Box>
                    <Text
                      fontSize="m"
                      color="grey1"
                      style={styles.spacingText}
                    >
                      {getTextWithLocale(e?.text)}
                    </Text>
                  </Box>
                </Box>
                <Box
                  flex
                  style={styles.qtyStyle}
                >
                  <Text fontSize="m">{e?.quantity}</Text>
                </Box>
              </Box>
            ))}
            {/* End type carpet */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListCarpet;
