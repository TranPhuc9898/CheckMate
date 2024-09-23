/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list curtain]
 */

import { FC, useContext } from "react";
import { Box, Divider, Text } from "@src/components";
import _ from "lodash";
import styles from "../styles";
import { getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";

interface ICurtain {
  curtain: any;
}

const ListCurtain: FC<ICurtain> = ({ curtain }) => {
  if (_.isEmpty(curtain)) {
    return null;
  }
  const I18n = useContext(LocalizationContext);
  // Render curtain dry clean
  const _RenderDryClean = () => {
    if (_.isEmpty(curtain?.dryclean)) {
      return null;
    }

    return (
      <Box>
        {/* Divider */}
        <Box style={styles.containerMargin}>
          <Divider color="black" />
        </Box>
        {/* Curtain */}
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
              {I18n.t("TASK_DETAIL.CURTAIN")} - {I18n.t("TASK_DETAIL.DRY_CLEANING")}
            </Text>
            <Box
              flex
              style={styles.qtyStyle}
            />
          </Box>
        </Box>
        {curtain?.dryclean?.map((item, index) => (
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

  // Render curtain washing
  const _RenderWashing = () => {
    if (_.isEmpty(curtain?.washing)) {
      return null;
    }

    return (
      <Box>
        {/* Divider */}
        <Box style={styles.containerMargin}>
          <Divider color="black" />
        </Box>
        {/* Mattress */}
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
              {I18n.t("TASK_DETAIL.CURTAIN")} - {I18n.t("TASK_DETAIL.WASHING")}
            </Text>
            <Box
              flex
              style={styles.qtyStyle}
            />
          </Box>
        </Box>
        {curtain?.washing?.map((item, index) => (
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
                <Text>1</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };
  return (
    <Box>
      {/* Render curtain dry clean */}
      <_RenderDryClean />

      {/* Render curtain washing */}
      <_RenderWashing />
    </Box>
  );
};

export default ListCurtain;
