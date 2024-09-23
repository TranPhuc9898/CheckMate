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
import { typeCurtainSofa } from "libs/config";

interface ICurtain {
  curtain: any;
}

const ListCurtain: FC<ICurtain> = ({ curtain }) => {
  if (_.isEmpty(curtain)) {
    return null;
  }
  const I18n = useContext(LocalizationContext);

  const _handleType = (serviceOption) => {
    if (serviceOption === typeCurtainSofa.onSite) {
      return (
        <Text
          fontSize="m"
          color="grey1"
        >
          {I18n.t("TASK_DETAIL.CURTAIN_CHOOSE_SERVICE_OFF_SITE")}
        </Text>
      );
    }
    return (
      <Text
        fontSize="m"
        color="grey1"
      >
        {I18n.t("TASK_DETAIL.CURTAIN_CHOOSE_SERVICE_ON_SITE")}
      </Text>
    );
  };

  return (
    <Box>
      {curtain?.map((item, index) => (
        <Box key={index}>
          {/* Divider */}
          <Box style={styles.containerMargin}>
            <Divider color="black" />
          </Box>
          <Box style={styles.containerRecord}>
            <Box
              flex
              row
            >
              <Box>
                <Text
                  bold
                  fontSize="m"
                >
                  {I18n.t("TASK_DETAIL.CURTAIN")} -{" "}
                  {getTextWithLocale(item?.text)}
                </Text>
              </Box>
              <Box
                flex
                style={styles.qtyStyle}
              />
            </Box>
            <Box style={styles.spacingText}>
              {_handleType(item?.serviceOption)}
            </Box>
            {/* Type curtain */}
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
            {/* End type curtain */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListCurtain;
