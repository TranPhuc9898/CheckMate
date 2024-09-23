/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list sofa]
 */

import { FC, useContext } from "react";
import { Box, Divider, Text } from "@src/components";
import _ from "lodash";
import styles from "../styles";
import { getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";

interface ISofa {
  sofa: any;
}

const ListSofa: FC<ISofa> = ({ sofa }) => {
  if (_.isEmpty(sofa)) {
    return null;
  }

  const _renderMore = (additionalSeat) => {
    if (!additionalSeat) {
      return null;
    }
    const I18n = useContext(LocalizationContext);
    return (
      <Box
        flex
        row
      >
        <Box flex>
          <Box>
            <Text
              fontSize="m"
              color="grey1"
              style={styles.spacingText}
            >
              {I18n.t("TASK_DETAIL.SOFA_CLEANING_TYPE_MORE")}
            </Text>
          </Box>
        </Box>
        <Box
          flex
          style={styles.qtyStyle}
        >
          <Text fontSize="m">{additionalSeat}</Text>
        </Box>
      </Box>
    )
  };

  return (
    <Box>
      {sofa?.map((item, index) => (
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
                  {getTextWithLocale(item?.text)}
                </Text>
              </Box>
              <Box
                flex
                style={styles.qtyStyle}
              />
            </Box>
            {/* Type sofa */}
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
            {/* End type sofa */}
            {_renderMore(item?.additionalSeat)}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListSofa;
