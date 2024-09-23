/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-17 11:49:10
 * @modify date 2023-03-17 11:49:10
 * @desc [Duration and type house Cleaning service]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import _ from "lodash";
import { durations, services, statusTask } from "libs/config";
import styles from "../../styles";
import { getTextWithLocale } from "libs/helper";
import { ITypeHouseAndDuration } from ".";

const TypeHouseAndDuration: FC<ITypeHouseAndDuration> = ({
  status,
  homeType,
  duration,
  description,
  serviceName,
}) => {
  const I18n = React.useContext(LocalizationContext);

  const _renderDescription = () => {
    if (status === statusTask.confirmed && description) {
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

  const _renderTypeHouse = () => {
    if (_.isEmpty(homeType)) {
      return null;
    }
    return (
      <Text style={styles.lineHeight}>
        {I18n.t("TASK_DETAIL.TYPE_HOUSE_LABEL")}{" "}
        <Text>{getTextWithLocale(homeType)}</Text>
      </Text>
    );
  };

  const _renderDuration = () => {
    let durationObj = null;
    if (serviceName === services.cleaning || serviceName === services.deepCleaning) {
      durationObj = _.find(durations, (item) => item.duration === duration)
    }
    if (_.isEmpty(durationObj)) {
      return null;
    }
    return (
      <Text style={styles.lineHeight}>
        {I18n.t("TASK_DETAIL.DURATION_HOUSE", {
          duration: durationObj?.duration,
          area: durationObj?.area,
        })}
      </Text>
    );
  };

  // Kiểm tra nếu không có mô tả, thời gian và loại nhà thì không render
  if (!_renderDescription() && !_renderDuration() && !_renderTypeHouse()) {
    return null;
  }

  return (
    <Box
      row
      alignCenter
      style={styles.marginTopLarge}
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
      <Box flex style={styles.boxContent}>
        {_renderDescription()}
        {_renderTypeHouse()}
        {_renderDuration()}
      </Box>
    </Box>
  );
};

export default TypeHouseAndDuration;
