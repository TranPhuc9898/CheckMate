
import { Box, Icon, Text } from "@src/components";
import React, { FC } from "react";
import { LocalizationContext } from "libs/context";
import styles from "../styles";

interface IOftenUseService {
  isOftenUseService?: boolean;
}

const OftenUseService: FC<IOftenUseService> = ({ isOftenUseService }) => {
  const I18n = React.useContext(LocalizationContext);
  if (!isOftenUseService) {
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
          name="oftenUseService"
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
          {I18n.t("TASK_DETAIL.ASKER_OFTEN_USE_SERVICE")}
        </Text>
      </Box>
    </Box>
  );
};

export default OftenUseService;
