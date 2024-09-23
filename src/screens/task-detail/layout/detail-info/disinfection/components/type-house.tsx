/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show type house]
 */

import React, { FC } from "react";
import { Box, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { getTextWithLocale, IObjectText } from "libs/helper";

interface ITypeHouse {
  spaceText: IObjectText;
  space?: string;
}

const TypeHouse: FC<ITypeHouse> = ({ spaceText, space }) => {
  const I18n = React.useContext(LocalizationContext);

  const iconTypeHouse = {
    INDOOR_AND_OUTDOOR: "outAndIndoor",
    INDOOR: "home",
    OUTDOOR: "sun",
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
          name={iconTypeHouse[space]}
          color="secondary"
        />
      </Box>
      <Box
        flex
        style={styles.contentLine}
      >
        <Text>{getTextWithLocale(spaceText)}</Text>
      </Box>
    </Box>
  );
};

export default TypeHouse;
