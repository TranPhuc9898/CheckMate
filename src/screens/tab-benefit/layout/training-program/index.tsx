import React, { FunctionComponent, ComponentProps } from "react";
import { View } from "react-native";
import Pie from "react-native-pie";
import { LocalizationContext } from "@src/libs/context";
import { Text, CardItem, Box } from "@src/components";
import styles from "./styles";

interface TrainingProgramProps extends ComponentProps<typeof View> {}

/**
 * title: Title of card
 * icon: Icon name
 * style: Style of card
 */
const TrainingProgramScreen: FunctionComponent<TrainingProgramProps> = ({navigation}) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <CardItem
      title={I18n.t("TAB_BENEFIT.TRAINING_PROGRAM")}
      iconName="right"
      onPress={() => navigation.navigate("TrainingProgramList")}
    >
      <Box
        row
        between
        style={styles.boxContainer}
      >
        <Box center>
          <Pie
            radius={50}
            innerRadius={40}
            sections={[
              {
                percentage: 50,
                color: "#989cd0",
              },
              {
                percentage: 12.5,
                color: "#d4d7ec",
              },
              {
                percentage: 37.5,
                color: "#F5F5F5",
              },
            ]}
          />
          <Box style={styles.boxPercent}>
            <Text style={styles.textPercent}>60%</Text>
          </Box>
        </Box>
        <Box style={styles.boxContainerNote}>
          <Box
            row
            center
          >
            <Box style={styles.boxBallReading} />
            <Text>10 readings</Text>
          </Box>
          <Box
            row
            style={styles.boxContainerExam}
          >
            <Box style={styles.boxBallExam} />
            <Text>2 Exam</Text>
          </Box>
        </Box>
      </Box>
    </CardItem>
  );
};

export default TrainingProgramScreen;
