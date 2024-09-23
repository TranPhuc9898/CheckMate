/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 09:09:30
 * @modify date 2023-03-17 09:09:30
 * @desc [Upolstery detail VN]
 */

import { FC, useContext } from "react";
import { Box, Icon, Text } from "@src/components";
import _ from "lodash";
import { LocalizationContext } from "libs/context";
import styles from "./components/styles";
import ListSofa from "./components/sofa/vn";
import ListMattress from "./components/mattress/list-mattress";
import ListCurtain from "./components/curtain.tsx/vn";
import ListCarpet from "./components/carpet/vn";
import { IDetailInfo } from "..";

const UpholsteryDetail: FC<IDetailInfo> = ({ detail }) => {
  const I18n = useContext(LocalizationContext);

  if (_.isEmpty(detail)) {
    return null;
  }
  // Render number units
  const _RenderNumberUnit = () => {
    if (!detail?.totalQuantity) {
      return null;
    }
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
            name="sofa"
            color="secondary"
          />
        </Box>
        <Box flex style={styles.contentLine}>
          <Box row>
            <Text>
              {I18n.t("TASK_DETAIL.NUMBER_TOTAL_SOFA")}
              <Text bold>{detail?.totalQuantity}</Text>
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };

  // Render list units
  const _RenderDetail = () => {
    return (
      <Box style={styles.containerListUnit}>
        <Box
          row
          alignCenter
          style={[styles.containerHeader, { paddingBottom: 0 }]}
        >
          <Box flex>
            <Text fontSize="m">{I18n.t("TASK_DETAIL.SOFA_TYPE")}</Text>
          </Box>
          <Box
            flex
            style={styles.qtyStyle}
          >
            <Text fontSize="m">{I18n.t("TASK_DETAIL.QTY")}</Text>
          </Box>
        </Box>
        {/* Sofa */}
        <ListSofa sofa={detail?.sofa || []} />

        {/* Mattress */}
        <ListMattress mattress={detail?.mattress || []} />

        {/* Curtain */}
        <ListCurtain curtain={detail?.curtain || []} />
        {/* Carpet */}
        <ListCarpet carpet={detail?.carpet} />
      </Box>
    );
  };

  return (
    <Box>
      {/* Render number units */}
      <_RenderNumberUnit />

      {/* Render detail */}
      <_RenderDetail />
    </Box>
  );
};

export default UpholsteryDetail;
