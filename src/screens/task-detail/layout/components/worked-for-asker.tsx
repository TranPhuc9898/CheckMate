
import { Box, Icon, Text } from "@src/components";
import React, { FC } from "react";
import { LocalizationContext } from "libs/context";
import styles from "../styles";

interface IWorkedForAsker {
  isWorkedForAsker?: boolean;
}

const WorkedForAsker: FC<IWorkedForAsker> = ({ isWorkedForAsker }) => {
  const I18n = React.useContext(LocalizationContext);
  if (!isWorkedForAsker) {
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
          name="workedForAsker"
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
          {I18n.t("TASK_DETAIL.WORKED_FOR_ASKER")}
        </Text>
      </Box>
    </Box>
  );
};

export default WorkedForAsker;
