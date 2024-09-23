/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 11:48:41
 * @modify date 2023-03-17 11:48:41
 * @desc [Duration and type house Disinfection service]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import styles from "../../styles";
import { ITypeHouseAndDuration } from ".";
import { statusTask } from "libs/config";

const TypeHouse: FC<ITypeHouseAndDuration> = ({
  homeType,
  detail,
  description,
  status,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const { area, customArea } = detail;

  const _renderArea = () => {
    if (area) {
      return (
        <Text style={styles.lineHeight}>
          {I18n.t("TASK_DETAIL.DISINFECTION_AREA_FROM_TO", {
            t1: area?.from,
            t2: area?.to,
          })}
        </Text>
      );
    }
    return (
      <Text style={styles.lineHeight}>{I18n.t("TASK_DETAIL.DISINFECTION_AREA_CUSTOM", { t: customArea })}</Text>
    );
  };

  const _renderDescription = () => {
    if (description && status === statusTask.confirmed) {
      return (
        <Text
          testID="addressDescription"
          fontWeight="m"
          color="grey0"
        >
          {description}
        </Text>
      );
    }
    return null;
  };
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
          name="home"
          color="primary"
        />
      </Box>
      <Box
        flex
        style={styles.boxContent}
      >
        {_renderDescription()}
        <Text>{getTextWithLocale(homeType)}</Text>
        <Box
          row
          alignCenter
        >
          <Text style={styles.lineHeight}>
            {I18n.t("TASK_DETAIL.AREA_DISINFECTION")}
          </Text>
          {_renderArea()}
        </Box>
      </Box>
    </Box>
  );
};

export default TypeHouse;
