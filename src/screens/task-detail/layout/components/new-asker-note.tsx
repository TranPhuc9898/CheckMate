/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render requirements]
 */

import { Box, Icon, Text } from "@src/components";
import React, { FC } from "react";
import { LocalizationContext } from "libs/context";
import styles from "../styles";

interface INoteForNewAsker {
  isNewAsker?: boolean;
}

const NoteForNewAsker: FC<INoteForNewAsker> = ({ isNewAsker }) => {
  const I18n = React.useContext(LocalizationContext);
  if (!isNewAsker) {
    return null;
  }
  return (
    <Box
      row
      between
      alignCenter
      style={styles.boxAnalytic}
    >
      <Box
        row
        alignCenter
      >
        <Icon
          name="account"
          color="primary"
        />
      </Box>
      <Box
        flex
        style={styles.boxContent}
      >
        <Text
          testID="newAskerNote"
          color="primary"
          style={{ fontStyle: "italic" }}
        >
          {I18n.t("TASK_DETAIL.NEW_ASKER_NOTE")}
        </Text>
      </Box>
    </Box>
  );
};

export default NoteForNewAsker;
