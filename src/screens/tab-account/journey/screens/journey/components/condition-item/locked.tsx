import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { getTextWithLocale } from "libs/helper";
import { Box, Image, MarkDown } from "components";
import { colors } from "libs/theme";
import styles from "./styles";

const { width } = Dimensions.get("window");

interface IConditionItem {
  dataCondition?: any;
}

const ConditionItem: React.FC<IConditionItem> = ({
  dataCondition,
}) => {

  return (
    <TouchableOpacity
      disabled={true}
      style={styles.container}
    >
      <Box center>
        <AnimatedCircularProgress
          width={15}
          rotation={240}
          lineCap="round"
          size={width / 3.2}
          arcSweepAngle={240}
          backgroundWidth={15}
          tintColor={colors.grey2}
          fill={0}
          backgroundColor={colors.grey2}
        />
        <Box
          center
          style={styles.wrapIconCondition}
        >
          <Grayscale>
            <Image
              source={{ uri: dataCondition?.icon }}
              style={[styles.image]}
            />
          </Grayscale>
        </Box>
        <Box style={styles.labelCondition}>
          <MarkDown
            center
            textStyle={styles.txtMarkDownStyle}
            text={getTextWithLocale(dataCondition?.text)}
            paragraphStyle={styles.paragraphStyle}
          />
        </Box>
        
      </Box>
    </TouchableOpacity>
  );
};

export default ConditionItem;
