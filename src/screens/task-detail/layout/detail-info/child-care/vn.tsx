/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-16 18:13:21
 * @modify date 2023-03-16 18:13:21
 * @desc [Child care detail]
 */

import { FC, useContext } from "react";
import { Box, Divider, Text } from "@src/components";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import { IDetailInfo } from "..";
import { colors } from "libs/theme";

const ChildCareDetail: FC<IDetailInfo> = ({ detail }) => {
  const I18n = useContext(LocalizationContext);
  const { numberOfChildren, detailChildren } = detail;

  return (
    <Box style={styles.containerDetail}>
      <Box
        row
        between
      >
        <Text>{I18n.t("TASK_DETAIL.AMOUNT_CHILD_LABEL")}</Text>
        <Text>{I18n.t("TASK_DETAIL.AGE_OF_CHILD")}</Text>
      </Box>
      <Divider color={colors.black} style={styles.txtLine} />
      {detailChildren?.map((item, index) => (
        <Box
          row
          between
          style={styles.txtLine}
          key={"child" + item?.weight}
        >
          <Text bold>
            {I18n.t("TASK_DETAIL.NUMBER_OF_CHILD")} {item?.weight}
          </Text>
          <Text>{getTextWithLocale(item?.age?.text)}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ChildCareDetail;
