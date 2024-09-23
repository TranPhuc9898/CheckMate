import React, { FC } from "react";
import { LocalizationContext } from "libs/context";
import { Icon, Box, Text } from "@src/components";
import styles from "../../styles";
import { IIconTet } from "./index";

const IconTet: FC<IIconTet> = ({ isTetBooking }) => {
  const I18n = React.useContext(LocalizationContext);
  if (isTetBooking) {
    return (
      <Box
        row
        style={styles.containerRequirement}
      >
        <Box
          row
          style={{ alignItems: "center", flex: 1 }}
        >
          <Icon
            name="tet"
            color="secondary"
            size="xxxl"
          />
        </Box>
        <Box style={{ flex: 9 }}>
          <Text numberOfLines={1}>
            <Text>{I18n.t("TASK_DETAIL.TET_BOOKING")}</Text>
          </Text>
        </Box>
      </Box>
    );
  }
  return null;
};

export default IconTet;
