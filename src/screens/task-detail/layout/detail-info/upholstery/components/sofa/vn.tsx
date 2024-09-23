/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list sofa]
 */

import { FC } from "react";
import { Box, Divider, Text } from "@src/components";
import _ from "lodash";
import styles from "../styles";
import { getTextWithLocale } from "libs/helper";

interface ISofa {
  sofa: any;
}

const ListSofa: FC<ISofa> = ({ sofa }) => {
  if (_.isEmpty(sofa)) {
    return null;
  }
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
            {item?.typeSofa?.map((e, index) => (
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
            {/* Stool sofa */}
            {item?.stool?.map((e, index) => (
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
            {/* End Stool sofa */}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListSofa;
