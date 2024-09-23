import * as React from "react";
import Pie from "react-native-pie";
import { colors } from "@src/libs/theme";
import { Box, Text } from "@src/components";
import styles from "./styles";

const Item = ({ currentStep, totalStep }) => {
  const percentage = (currentStep / totalStep) * 100;
  return (
    <Box
      center
      style={styles.rightContent}
    >
      <Pie
        radius={30}
        innerRadius={25}
        sections={[
          {
            percentage: 50,
            color: percentage ? colors.primary : colors.primary3,
          },
          {
            percentage: 50,
            color: colors.primary3,
          },
        ]}
        dividerSize={4}
        strokeCap={"round"}
      />
      <Box style={styles.gauge}>
        <Text fontSize="m">{`${currentStep}/${totalStep}`}</Text>
      </Box>
    </Box>
  );
};

export default Item;
