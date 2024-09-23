import { Box, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { FC, useContext } from "react";
import styles from "../styles";

interface ITotalUnit {
  total: number;
}

const TotalUnit: FC<ITotalUnit> = ({ total }) => {
  const I18n = useContext(LocalizationContext);

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
          name="airConditioner"
          color="secondary"
        />
      </Box>
      <Box
        flex
        style={styles.contentLine}
      >
        <Text bold>
          {I18n.t("TASK_DETAIL.AIR_CONDITIONER_NUMBER", {
            t: total,
          })}
        </Text>
      </Box>
    </Box>
  );
};
export default TotalUnit;
